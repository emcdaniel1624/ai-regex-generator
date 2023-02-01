import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const [noResponse, setNoResponse] = useState(true);
  const [response, setResponse] = useState<string>("")
  const {refetch:generateRefetch} = api.regex.generate.useQuery(
    {
      prompt: value
    },
    {
      enabled: false
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await generateRefetch().then((data) => {
      const text = data.data?.response;
      if (typeof text === 'string') {
        console.log('Regex', text);
        setResponse(text);
      }
    });
    setNoResponse(false);
  };

  return (
    <>
      <Head>
        <title>Regex AI</title>
        <meta name="description" content="Regex generator built with GPT3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen flex flex-col items-center md:justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-4 md:gap-8 px-4 pt-36 md:pt-0">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Regex<span className="text-[hsl(280,100%,70%)]">.AI</span>
          </h1>
          <div className="flex flex-col items-center gap-3 justify-center">
            <p className="text-lg md:text-2xl text-white mb-3">
              Generate Regular Expressions From Words
            </p>
            <form onSubmit={(event) => {void handleSubmit(event)}} className="bg-white p-6 w-[320px] md:w-[480px] rounded-lg shadow-md flex flex-col items-center justify-center">
              <div className="mb-4 w-[100%]">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="value">
                      Generate a Regex that...
                  </label>
                  <input
                      className="border border-gray-400 p-2 w-full"
                      type="text"
                      id="value"
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      placeholder="Removes all white space from a string"
                  />
              </div>
              <button className="bg-[hsl(280,100%,70%)] hover:bg-purple-500 text-white font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-100">
                  Generate
              </button>
            </form>
            {!noResponse &&
              <div className="flex w-[320px] md:w-[480px]">
                <div className="flex-grow border border-gray-400 px-4 pt-2 pb-2 md:pb-3 text-lg md:text-2xl text-white mr-3">
                  {response}
                </div>
                <button onClick={() => void navigator.clipboard.writeText(response)}
                        className="hover:underline text-white font-medium py-2 px-3 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 active:scale-100">
                  Copy
                </button>
              </div>
            }
          </div>
          <Link className="text-white underline" href={"https://github.com/emcdaniel1624/ai-regex-generator"}>Source Code</Link>
        </div>
      </main>
    </>
  );
};

export default Home;
