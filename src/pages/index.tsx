import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const [noResponse, setNoResponse] = useState(true);
  const [response, setResponse] = useState<string>("Enter a prompt to generate a Regex")
  const { refetch } = api.generate.generate.useQuery(
    {
      prompt: value
    },
    {
      enabled: false
    }
  );
  //const test = 'emcdaniel1624@gmail.com';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await refetch().then((data) => {
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
      <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Regex<span className="text-[hsl(280,100%,70%)]">.AI</span>
          </h1>
          <div className="flex flex-col items-center justify-center">
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
                  />
              </div>
              <button className="bg-[hsl(280,100%,70%)] hover:bg-purple-500 text-white font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-100 active:translate-y-1">
                  Generate
              </button>
            </form>
          </div>
            <div className="flex">
              <p className="text-lg md:text-2xl text-white mr-3">
                {response}
              </p>
              {!noResponse &&
                <button onClick={() => void navigator.clipboard.writeText(response)}
                        className="md:bg-[hsl(280,100%,70%)] hover:bg-purple-300 text-white font-medium py-2 px-3 rounded-full">
                  📋
                </button>
              }
            </div>
            <Link className="text-white underline" href={"https://github.com/emcdaniel1624/ai-regex-generator"}>Source Code</Link>
        </div>
      </main>
    </>
  );
};

export default Home;
