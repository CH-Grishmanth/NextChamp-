import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

router.post('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

router.get('/:id/pdf', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;