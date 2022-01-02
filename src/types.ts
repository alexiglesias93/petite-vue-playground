type ComponentInstance<T = Record<string, HTMLElement>> = ThisType<{
  $refs: T;
}> & {
  [key: string]: unknown;
};

export type Component<T = Record<string, HTMLElement>> = (props?: unknown) => ComponentInstance<T>;
