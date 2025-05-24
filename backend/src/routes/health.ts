import { Router } from 'express';
import { healthCheck, ping } from '../controllers/healthCheck';
import { conditionalRateLimit, publicApiLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public health check endpoints
router.get('/health', conditionalRateLimit(publicApiLimiter), healthCheck);
router.get('/ping', conditionalRateLimit(publicApiLimiter), ping);

export default router;
