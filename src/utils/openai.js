import OpenAI from 'openai';
import { OPEN_API } from './constants';

const openai = new OpenAI({
    apiKey: process.env[OPEN_API], 
  });

export default openai;