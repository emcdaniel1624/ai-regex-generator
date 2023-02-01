import { Configuration, OpenAIApi } from "openai";
import { env } from "../env/server.mjs";

const configuration = new Configuration({
    apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;