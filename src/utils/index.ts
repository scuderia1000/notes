export const generateId = (): string => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export const isIntersects = function (boundingClientRectA: DOMRect, boundingClientRectB: DOMRect): boolean {
  const rectA = {
    x: boundingClientRectA.left,
    x1: boundingClientRectA.left + boundingClientRectA.width,
    y: boundingClientRectA.top,
    y1: boundingClientRectA.top + boundingClientRectA.height,
  }
  const rectB = {
    x: boundingClientRectB.left,
    x1: boundingClientRectB.left + boundingClientRectB.width,
    y: boundingClientRectB.top,
    y1: boundingClientRectB.top + boundingClientRectB.height,
  }
  return !(
    rectA.x > rectB.x1 ||
    rectA.x1 < rectB.x ||
    rectA.y > rectB.y1 ||
    rectA.y1 < rectB.y
  );
}
