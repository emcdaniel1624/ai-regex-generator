import openai from "../../utils/openai";

export const generateRegex = async (promptText: string) => {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        Generate a regex pattern with the following requirements.
        Requirements: A regex that "${promptText}"
        Result:`,
        max_tokens: 150,
        temperature: 0,
        stop: [":"]
      });
      console.log(completion.data.choices[0]?.text);
      return completion.data.choices[0]?.text;
    }
    catch (error: any) {
      console.error("OpenAI error: ", error);
    }
  }