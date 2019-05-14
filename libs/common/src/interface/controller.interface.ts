import { Router } from 'express';

export interface ControllerInterface {
  init(): Router;
}
