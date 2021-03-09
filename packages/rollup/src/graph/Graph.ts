export class Graph<T> {
  // Making graph immutable requires complicated implementation and may cause optimization problems
  // eslint-disable-next-line functional/prefer-readonly-type
  private readonly graph: Map<T, Set<T>> = new Map<T, Set<T>>();

  public getGraph(): ReadonlyMap<T, ReadonlySet<T>> {
    return this.graph;
  }

  public getVertices(): readonly T[] {
    return Array.from(this.graph.keys());
  }

  public getAdjacents(value: T): readonly T[] {
    return Array.from(this.graph.get(value) ?? []);
  }

  public addVertex(value: T): void {
    if (!this.graph.has(value)) this.graph.set(value, new Set<T>());
  }

  public addEdge(source: T, destination: T): void {
    this.addVertex(source);
    this.addVertex(destination);
    this.graph.get(source)?.add(destination);
  }

  public removeVertex(value: T): void {
    this.graph.delete(value);
    this.graph.forEach((adjacents) => adjacents.delete(value));
  }

  public topologicalSort(): readonly T[] {
    // eslint-disable-next-line functional/prefer-readonly-type
    const topologicalArray: T[] = [];
    const visited = new Set<T>();
    const inDegree = new Map<T, number>();
    const queue = new Array<T>();

    this.graph.forEach((adjacents, vertex) => {
      if (!inDegree.has(vertex)) inDegree.set(vertex, 0);
      adjacents.forEach((value) => {
        const degree = inDegree.get(value) ?? 0;
        inDegree.set(value, degree + 1);
      });
    });

    this.graph.forEach((_adjacents, vertex) => {
      if (inDegree.get(vertex) === 0) {
        // eslint-disable-next-line functional/immutable-data
        queue.push(vertex);
        visited.add(vertex);
      }
    });

    // eslint-disable-next-line functional/no-loop-statement
    while (queue.length) {
      // eslint-disable-next-line functional/immutable-data
      const vertex = queue.shift();
      // eslint-disable-next-line functional/immutable-data
      topologicalArray.push(vertex as T);
      this.graph.get(vertex as T)?.forEach((value) => {
        if (!visited.has(value)) {
          const degree = inDegree.get(value) ?? 0;
          inDegree.set(value, degree - 1);
          if (inDegree.get(value) === 0) {
            // eslint-disable-next-line functional/immutable-data
            queue.push(value);
            visited.add(value);
          }
        }
      });
    }

    return topologicalArray;
  }
}
