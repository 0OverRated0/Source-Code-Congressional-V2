import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { JobServiceClient } from '@google-cloud/talent';

const app = express();
const port = 3000; // You can change this to any port you prefer

// Replace with your actual Google API key
const GOOGLE_API_KEY = 'AIzaSyDuLzd27KAbd0VlkG-n02IUnVWnXtUMJlM';

// Replace with your Google Cloud project ID
const PROJECT_ID = 'your-project-id';

const jobServiceClient = new JobServiceClient();

app.use(express.json());

const veteranServicesHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // ... (keep your existing veteranServicesHandler code)
};

const jobSearchHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { query } = req.query;

  if (typeof query !== 'string') {
    res.status(400).json({ error: 'Invalid query' });
    return;
  }

  try {
    const formattedParent = jobServiceClient.projectPath(PROJECT_ID);
    const request = {
      parent: formattedParent,
      requestMetadata: {
        domain: 'www.example.com',
        sessionId: 'session1234',
        userId: 'user5678',
      },
      jobQuery: {
        query: query,
        // Add other filters as needed, e.g., for veteran-specific jobs
      },
    };

    const [response] = await jobServiceClient.searchJobs(request);
    res.json(response);
  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({ error: 'Failed to search jobs' });
  }
};

// Replace '192.168.1.X' with your actual local IP address
const localIP = '192.168.1.26:8081'; 

app.get('/api/veteranServices', veteranServicesHandler);
app.get('/api/jobs', jobSearchHandler);

app.listen(port, localIP, () => {
  console.log(`Server running at http://${localIP}:${port}`);
});