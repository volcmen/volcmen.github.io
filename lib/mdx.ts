import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  tech: string[];
  year: number;
  images?: string[];
  link?: string;
  repo?: string;
  content?: string;
}

interface RawFrontmatter {
  title?: string;
  description?: string;
  summary?: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  tech?: string[];
  tags?: string[];
  year?: number;
  date?: string | number | Date;
  link?: string;
  repo?: string;
}

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');
const PROJECT_IMAGES_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'projects');
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg']);

// Simple in-memory caches to avoid repeated disk reads during a single runtime
const projectCache = new Map<string, Project>();
const projectImagesCache = new Map<string, string[]>();

const toSlug = (slug: string) => slug.replace(/\.mdx$/, '');

const parseYear = (rawYear?: number, rawDate?: RawFrontmatter['date']) => {
  if (typeof rawYear === 'number' && Number.isFinite(rawYear)) {
    return rawYear;
  }

  const parsedDate = rawDate ? new Date(rawDate) : new Date();
  return Number.isNaN(parsedDate.getTime()) ? new Date().getFullYear() : parsedDate.getFullYear();
};

const readProjectFile = (slug: string) => {
  const fullPath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
};

const getProjectImages = (slug: string): string[] => {
  if (projectImagesCache.has(slug)) return projectImagesCache.get(slug) || [];

  const imagesDir = path.join(PROJECT_IMAGES_DIR, slug);
  if (!fs.existsSync(imagesDir)) {
    projectImagesCache.set(slug, []);
    return [];
  }

  try {
    const files = fs.readdirSync(imagesDir, { withFileTypes: true });
    const images = files.reduce<string[]>((acc, entry) => {
      if (!entry.isFile()) return acc;
      const file = entry.name;
      const ext = file.toLowerCase().split('.').pop();
      if (!ext || !IMAGE_EXTENSIONS.has(ext)) return acc;
      acc.push(file);
      return acc;
    }, [])
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
        return numA - numB || a.localeCompare(b);
      })
      .map(file => `/assets/images/projects/${slug}/${file}`);

    projectImagesCache.set(slug, images);
    return images;
  }
  catch (error) {
    console.error(`Error reading images for project ${slug}:`, error);
    projectImagesCache.set(slug, []);
    return [];
  }
};

const buildProject = (slug: string, frontmatter: RawFrontmatter, content: string): Project | null => {
  if (!frontmatter.title || !frontmatter.description) return null;

  const tech = frontmatter.tech || frontmatter.tags || [];
  const features = frontmatter.features || [];
  const images = getProjectImages(slug);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    longDescription: frontmatter.longDescription || frontmatter.summary,
    problem: frontmatter.problem,
    solution: frontmatter.solution,
    features,
    tech,
    year: parseYear(frontmatter.year, frontmatter.date),
    images: images.length ? images : undefined,
    link: frontmatter.link,
    repo: frontmatter.repo,
    content,
  };
};

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = toSlug(slug);
  if (projectCache.has(realSlug)) return projectCache.get(realSlug) || null;

  try {
    const parsed = readProjectFile(realSlug);
    if (!parsed) return null;

    const project = buildProject(realSlug, parsed.data as RawFrontmatter, parsed.content);
    if (project) projectCache.set(realSlug, project);
    return project ?? null;
  }
  catch (error) {
    console.error(`Error getting project ${realSlug}:`, error);
    return null;
  }
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true });
  const projects = files.reduce<Project[]>((acc, entry) => {
    if (!entry.isFile() || !entry.name.endsWith('.mdx')) return acc;
    const project = getProjectBySlug(entry.name);
    if (project) acc.push(project);
    return acc;
  }, [])
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  return projects;
}
