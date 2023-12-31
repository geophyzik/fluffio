import { computeCorrectionCSS } from './compute-correction-css';
import { computeCoordPlacement } from './compute-coord-placement';
import { ComputePositionParams } from '../types';
import { fluffioEventTarget } from '../event-target';
import { EVENTS } from '../constants';

export const computePosition = (
  popoverNode: HTMLElement,
  referenceNode: HTMLElement,
  { direction = 'bottom', side = 'mid', silent }: ComputePositionParams,
) => {
  const { x, y } = computeCoordPlacement(referenceNode, direction, side);

  if (!silent) {
    const event = new CustomEvent(EVENTS.beforePlace, {
      detail: { x, y, direction, side },
    });
    fluffioEventTarget.dispatchEvent(event);
  }

  popoverNode.style.transform = computeCorrectionCSS(x, y, direction, side);

  if (!silent) {
    const event = new CustomEvent(EVENTS.afterPlace, {
      detail: { x, y, direction, side },
    });
    fluffioEventTarget.dispatchEvent(event);
  }
};
