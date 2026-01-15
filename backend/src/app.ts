import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import formationRoutes from './routes/formation.routes.js';
import leconRoutes from './routes/lecon.routes.js';
import coursRoutes from './routes/cours.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import questionRoutes from './routes/question.routes.js';
import responseRoutes from './routes/reponse.routes.js';
import categoryRoutes from './routes/category.routes.js';


const app = express();


app.use(cors());
app.use(express.json());

// user routes
app.use('/users', userRoutes);
// auth routes
app.use('/auth', authRoutes);
// formation routes
app.use('/formations', formationRoutes);


// Routes protegées → enseignants ou admin seulement
app.use('/users', authMiddleware, userRoutes);
app.use('/formations', authMiddleware, formationRoutes);
app.use('/lecons', authMiddleware, leconRoutes);
app.use('/cours', authMiddleware, coursRoutes);
app.use("/quiz", quizRoutes);
app.use("/questions", questionRoutes);
app.use("/response", responseRoutes);
app.use("/categories", authMiddleware, categoryRoutes);
app.use("/lecons", authMiddleware, leconRoutes);


export default app;
