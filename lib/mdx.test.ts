import { describe, expect, test } from 'bun:test';

import { getAllProjects, getProjectBySlug } from './mdx';

describe('project content under Bun', () => {
  test('loads every MDX project with valid metadata and existing images', async () => {
    const files = Array.from(new Bun.Glob('*.mdx').scanSync('content/projects'));
    const projects = getAllProjects();

    expect(files.length).toBeGreaterThan(0);
    expect(projects.map(project => project.slug).sort()).toEqual(
      files.map(file => file.replace(/\.mdx$/, '')).sort(),
    );

    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(Number.isFinite(project.year)).toBe(true);
      expect(getProjectBySlug(project.slug)).toEqual(project);
      expect(getProjectBySlug(`${project.slug}.mdx`)).toEqual(project);
      for (const image of project.images ?? []) {
        expect(await Bun.file(`public${image}`).exists()).toBe(true);
      }
    }
  });

  test('sorts projects by year descending, then title', () => {
    const projects = getAllProjects();
    expect(projects).toEqual(
      [...projects].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)),
    );
  });

  test('returns null for missing content', () => {
    expect(getProjectBySlug('__missing_project__')).toBeNull();
  });
});
