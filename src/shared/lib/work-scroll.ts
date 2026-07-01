/** Shared scroll math for the desktop project panel reel. */

export const getPanelMaxScroll = (container: HTMLElement) =>
  Math.max(0, container.scrollHeight - container.clientHeight);

export const isPanelAtBottom = (container: HTMLElement, threshold = 12) =>
  container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;

export const isPanelAtTop = (container: HTMLElement, threshold = 12) =>
  container.scrollTop <= threshold;

export const getPanelScrollTopForIndex = (
  container: HTMLElement,
  index: number,
  itemCount: number,
  getItemNode: (index: number) => HTMLElement | null,
) => {
  const node = getItemNode(index);
  if (!node) {
    return 0;
  }

  const maxScroll = getPanelMaxScroll(container);

  if (index === itemCount - 1) {
    // Last card may start below the maximum scroll offset when content is tall.
    return Math.min(node.offsetTop, maxScroll);
  }

  return node.offsetTop;
};

export const resolvePanelIndex = (
  container: HTMLElement,
  itemCount: number,
  getItemNode: (index: number) => HTMLElement | null,
  edgeThreshold = 12,
) => {
  if (itemCount === 0) {
    return 0;
  }

  if (isPanelAtBottom(container, edgeThreshold)) {
    return itemCount - 1;
  }

  if (isPanelAtTop(container, edgeThreshold)) {
    return 0;
  }

  const anchor = container.scrollTop + Math.min(container.clientHeight * 0.2, 48);
  let index = 0;

  for (let i = 0; i < itemCount; i += 1) {
    const node = getItemNode(i);
    if (node && node.offsetTop <= anchor + 1) {
      index = i;
    }
  }

  return index;
};
