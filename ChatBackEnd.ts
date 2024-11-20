import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { GoogleAuth } from 'google-auth-library';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const CREDENTIALS = {
  "type": "service_account",
  "project_id": "local-bebop-439303-n1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMsbwI66VJ9jVA\nOsehPsjDqtX1aO2dkNfCUur0RW5GEGnZOOdVkEUYOS/PrKmaIKLBTpj0tLQoU9WE\nvKsr3x1u0JiEDK1OPmiTj05Lb64cuzdv5volL8e0by1KHHeE4cVJkhTHwLfYTS6m\nPGKnez0ryN6ZX0BgA/York/XdRo3OU5+GkjLwHJHB4aEwuYxFBbKbex5m2/PUGNL\nLgG1RscsLIREx+Uv/uVhkb2CHUXORoYf/NZH85l+bjAYCZKkkfwWeQNlddE4QW8r\ng/ZVFifM1p+Y5bATrSEPgZ70cu8UAott73MHmabckkIzQdtDlLX0lZkyq9rW6u2P\nzvPXI6H9AgMBAAECggEAQac2rZr42JixpLVJLq9TlCsGCKzcJOjQJff3d+FmYf+K\nxTjOipj2BSW6b9iMlEWibT42Fgq0/xSP0I8R+Tj2TR297fDUdmyc9C6tRHpq7zFV\n3zwTgoLXWBWBNtIt265XF8u5MrV1lNP/bsdC6hCSLPphFYTjT2rJ1ZXx4ALfJuE/\ntTXEX5JzgWL0EwIjl9vBNrp9baKCgTTSFlRqDaxQrqMLNJD41Ld9DCY9axsO3fmd\nUugOdT/s/tGuK36VVbt7fiRCex65nL8Y6boIqwHd4iVmSTwyOtvT2lhrOSNRF/nz\nW5s1ycNlrpwLc6L71aQ37t0Yy7ktvlK0p78iDfNZ6QKBgQDGzszCPYWFTUMDzaZx\nA8nGiiUoU87l1cLzesBgARp4g6s3y3kNON/7eMc8WJ2uf4H7X0KMgV8sC9eYvPP+\nG2y2TkZ9ceHa0tsXnxgokgz6DQ5NftaexBaIY5dg16cBKv6cJTAVrO2NRZgO7Jjw\nx7xf9ssjekParOwMmmlxnpNgZwKBgQC1KyniuaKMgqU1M2JiLMbY6TZVA5iJm97g\nCsT8z/Yk8j0TsE210ILl7YSpOxtbkGRQycG6FgRLcEn43gy3gcFuN3/ZR+4gyns0\niMwEGOaD/IcsqWHLL+U6HKtUjOEBYw4NaBEagzHFj+5p23DzyXoIURb9Y74opmrf\nVLFrAfTb+wKBgCZIdE2DI08EDb+RvldM73H38CfP26uOejgAj0Ltc3d5g2L/H5RY\nO2llXJhWSCbuDs2lDl+YGgeVUDLtT97C0TBZ6mEFqQRGTkJCNJi7ZxxPn010+0cf\nY2doJiJT5Kjo6paO4q+J2US2/g0BqoHTNIcWMw/l32MgoWPb6Cok6yRJAoGAemPI\njiR+jZIM7d3izxQU2aDjVZdySzSD4rMj1O7hCKClZlGqjfNpGs/U2UbW+oqXWoSS\nXZZWHGilcH0B9k6wUDcqJa2UT466oQjxWqs/v1awMxnSuSOIJjQMAriRoRA8BA6T\nz2dmDmNn2xemPOuVh1zQvSnO40NZ27opiXLu6lUCgYAohsywT+oCV148ksfhc7XI\nlVmSR2q7zAE5TFxV3SA/JQ4Bs6/5vpx3p4yBT6wO7347XU02+KZqc6Q93SS6hmbP\nR/u/bgVXQtO97RDuTLS92pLK1083DE3/hdp7ICXPkQ8oKBNAUUaTqegu+uUadGqf\nYiWhRl6Azj+sOXOGU8DhUw==\n-----END PRIVATE KEY-----\n",
  "client_email": "jatbot@local-bebop-439303-n1.iam.gserviceaccount.com",
  "client_id": "103347114371599548478",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/jatbot%40local-bebop-439303-n1.iam.gserviceaccount.com"
};


const auth = new GoogleAuth({
  credentials: CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/dialogflow']
});

app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  try {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    const response = await axios.post(
      `https://dialogflow.googleapis.com/v2/projects/${PROJECT_ID}/agent/sessions/${uuidv4()}:detectIntent`,
      {
        queryInput: {
          text: {
            text: message,
            languageCode: 'en-US',
          },
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const botResponse = response.data.queryResult.fulfillmentText;
    res.json({ reply: botResponse });
  } catch (error) {
    console.error('Error sending message to Dialogflow:', error.response ? error.response.data : error.message);
    res.status(500).send('Error processing request');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});