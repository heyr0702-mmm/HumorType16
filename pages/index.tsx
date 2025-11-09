import Head from "next/head";
import Link from "next/link";
import { trackEvent } from "@/utils/analytics";

export default function HumorverseHomeSlitePlus() {
  return (
    <>
      <Head>
        <title>HumorType16 – 世界とユーモアでつながる診断</title>
        <meta
          name="description"
          content="HumorType16は、あなたのユーモアのリズムを4つの感性要素で読み解く診断です。世界と、ユーモアでつながる体験をはじめましょう。"
        />
      </Head>
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-12 pb-24 sm:px-8 md:pt-20">
        <div className="mt-2 max-w-5xl">
          <h1 className="relative text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] md:text-6xl lg:text-7xl">
            世界と、
            <span className="relative inline-block bg-gradient-to-r from-[#6E56CF] to-[#A779E9] bg-clip-text text-transparent">
              ユーモア
            </span>
            でつながろう。
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#5A5A5A] md:text-xl">
            HumorType16は、あなたのユーモアのリズムを4つの感性要素で読み解き、
            「どんな笑いを生み、どんな笑いに惹かれるのか」を可視化する診断です。
            <br />
            感性が違えば、世界の見え方も違う。違いが響き合う世界へようこそ。
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/test"
              className="rounded-full bg-[#6E56CF] px-6 py-3 text-base text-white shadow-sm transition duration-300 ease-in-out hover:bg-[#5B45B5]"
              onClick={() => trackEvent("cta_click_home", { label: "start_test" })}
            >
              診断をはじめる
            </Link>
            <Link
              href="/vision"
              className="rounded-full border border-[#1F1F1F]/80 px-6 py-3 text-base transition duration-300 ease-in-out hover:border-[#1F1F1F]"
              onClick={() => trackEvent("cta_click_home", { label: "read_vision" })}
            >
              Visionを読む
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
