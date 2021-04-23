const degreeOne = 1;
const degreeTwo = 2;

export class Graph<T> {
  // Making graph immutable requires complicated implementation and may cause optimization problems
  /* eslint-disable functional/prefer-readonly-type, functional/no-loop-statement,
  functional/no-let, functional/immutable-data, functional/no-throw-statement */
  private readonly graph: Map<T, Set<T>> = new Map<T, Set<T>>();

  private cycleStart: T | undefined;

  private cycleEnd: T | undefined;

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

  public getCycle(): readonly T[] {
    const degree = new Map<T, number>();
    const parent = new Map<T, T>();

    const vertices = this.getVertices();
    for (const vertex of vertices) {
      if (!degree.has(vertex) && this.dfs(vertex, degree, parent)) break;
    }

    if (!this.cycleStart || !this.cycleEnd) return [];

    const cycle: T[] = [];
    cycle.push(this.cycleStart);
    let vertex = this.cycleEnd;
    while (vertex !== this.cycleStart) {
      cycle.push(vertex);
      vertex = parent.get(vertex) ?? this.cycleStart;
    }
    cycle.push(this.cycleStart);

    return cycle.reverse();
  }

  public topologicalSort(): readonly T[] {
    const cycle = this.getCycle();
    if (cycle.length) {
      throw new Error(`Dependency cycle was found: [${cycle}]`);
    }

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
        queue.push(vertex);
        visited.add(vertex);
      }
    });

    while (queue.length) {
      const vertex = queue.shift();
      topologicalArray.push(vertex as T);
      this.graph.get(vertex as T)?.forEach((value) => {
        if (!visited.has(value)) {
          const degree = inDegree.get(value) ?? 0;
          inDegree.set(value, degree - 1);
          if (inDegree.get(value) === 0) {
            queue.push(value);
            visited.add(value);
          }
        }
      });
    }

    return topologicalArray;
  }

  private dfs(vertex: T, degree: Map<T, number>, parent: Map<T, T>): boolean {
    degree.set(vertex, degreeOne);

    const adjacents = this.getAdjacents(vertex);

    for (const adjacent of adjacents) {
      if (!degree.has(adjacent)) {
        parent.set(adjacent, vertex);
        if (this.dfs(adjacent, degree, parent)) return true;
      } else if (degree.get(adjacent) === 1) {
        this.cycleEnd = vertex;
        this.cycleStart = adjacent;
        return true;
      }
    }
    degree.set(vertex, degreeTwo);
    return false;
  }

  /* eslint-enable functional/prefer-readonly-type, functional/no-loop-statement,
  functional/no-let, functional/immutable-data, functional/no-throw-statement */
}
