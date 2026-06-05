import { Router } from 'express';

const router = Router();

router.post('/videos', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;