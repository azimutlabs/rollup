import { collect, fromWorkspaces, sortDependencies } from '@azimutlabs/rollup';
import { Graph } from '@azimutlabs/rollup/lib/graph';
import { resolve } from 'path';

const result = [
  {
    input: 'a.js',
    output: {
      file: 'a.js',
      format: 'cjs',
    },
  },
  {
    input: 'b.js',
    output: {
      file: 'b.js',
      format: 'esnext',
    },
  },
  {
    input: 'c.js',
    output: {
      file: 'c.js',
      format: 'cjs',
    },
  },
  {
    input: 'c.js',
    output: {
      file: 'c.js',
      format: 'cjs',
    },
  },
];

describe('rollup', () => {
  it('collect should work properly', async () => {
    const config = await collect(['**/rollup.config.js']);
    expect(config).toStrictEqual(result);
  });

  it('graph should work', () => {
    const graph = new Graph<number>();
    graph.addEdge(5, 2);
    graph.addEdge(5, 0);
    graph.addEdge(2, 3);
    graph.addEdge(3, 1);
    graph.addEdge(4, 1);
    graph.addEdge(4, 0);

    expect(graph.getVertices()).toStrictEqual([5, 2, 0, 3, 1, 4]);
    expect(graph.getAdjacents(5)).toStrictEqual([2, 0]);
    expect(graph.getAdjacents(4)).toStrictEqual([1, 0]);
    expect(graph.getAdjacents(3)).toStrictEqual([1]);
    expect(graph.getAdjacents(2)).toStrictEqual([3]);
  });

  it('topological sort of the graph should work', () => {
    const graph = new Graph<string>();
    graph.addEdge('a', 'b');
    graph.addEdge('a', 'c');
    graph.addEdge('c', 'd');
    graph.addEdge('a', 'd');
    graph.addEdge('d', 'b');
    graph.addEdge('b', 'e');

    const topologicalSort = graph.topologicalSort();
    expect(topologicalSort).toStrictEqual(['a', 'c', 'd', 'b', 'e']);
  });

  it('sortDependencies should work correctly', () => {
    const sorted = sortDependencies(['src/rollup/packages/*']);

    expect(sorted).toStrictEqual([
      'src/rollup/packages/c',
      'src/rollup/packages/a',
      'src/rollup/packages/b',
    ]);
  });

  it('fromWorkspaces should work properly with default parameter', () => {
    expect(fromWorkspaces()).toStrictEqual([
      resolve('src/rollup/rollup.config.@(js|mjs|cjs)'),
      resolve('src/rollup-config/rollup.config.@(js|mjs|cjs)'),
      resolve('src/rollup-plugin-external/rollup.config.@(js|mjs|cjs)'),
      resolve('src/rollup/packages/c/rollup.config.@(js|mjs|cjs)'),
      resolve('src/rollup/packages/a/rollup.config.@(js|mjs|cjs)'),
      resolve('src/rollup/packages/b/rollup.config.@(js|mjs|cjs)'),
    ]);
  });

  it('fromWorkspaces should work properly with given parameter', () => {
    expect(fromWorkspaces('rollup.*.js')).toStrictEqual([
      resolve('src/rollup/rollup.*.js'),
      resolve('src/rollup-config/rollup.*.js'),
      resolve('src/rollup-plugin-external/rollup.*.js'),
      resolve('src/rollup/packages/c/rollup.*.js'),
      resolve('src/rollup/packages/a/rollup.*.js'),
      resolve('src/rollup/packages/b/rollup.*.js'),
    ]);
  });

  it('collect should work with fromWorkspaces', async () => {
    const config = await collect(fromWorkspaces('packages/*/rollup.config.js'));
    expect(config).toStrictEqual(result);
  });
});
