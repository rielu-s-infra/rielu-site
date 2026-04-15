import Head from "next/head";
import { getLatestPosts, PostMeta } from "../lib/posts";

type Props = {
  posts: PostMeta[];
};

export async function getStaticProps() {
  return {
    props: {
      posts: getLatestPosts(3),
    },
  };
}

function renderNewsItems(posts: PostMeta[]) {
  if (posts.length === 0) {
    return (
      <div className="news-item">
        <span className="news-date">---</span>
        <p className="news-content">現在お知らせはありません。</p>
      </div>
    );
  }

  return posts.map((post) => (
    <div className="news-item" key={post.slug}>
      <span className="news-date">{post.date}</span>
      <div>
        <strong>{post.title}</strong>
        <p className="news-content">{post.description}</p>
      </div>
    </div>
  ));
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>rielu | Official Site</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style>{`
          :root {
            --primary: #326ce5;
            --dark: #1a1a1a;
            --light: #f4f7f6;
            --white: #ffffff;
            --border: #e0e0e0;
          }

          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            background-color: var(--light);
            color: #333;
            line-height: 1.6;
            scroll-behavior: smooth;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 20px;
          }

          header {
            background-color: var(--dark);
            color: var(--white);
            padding: 40px 0;
            border-bottom: 4px solid var(--primary);
          }

          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
          }

          .profile-group {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .profile-icon-nav {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--primary);
          }

          header h1 {
            margin: 0;
            font-size: 1.8rem;
            letter-spacing: -0.5px;
          }

          nav ul {
            list-style: none;
            padding: 0;
            display: flex;
            gap: 20px;
            margin: 0;
          }

          nav a {
            color: #aaa;
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s;
          }

          nav a:hover {
            color: var(--white);
          }

          .section {
            padding: 60px 0;
          }

          h2 {
            font-size: 1.5rem;
            margin-bottom: 25px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .about-me-card {
            background: var(--white);
            padding: 35px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            gap: 30px;
            margin-bottom: 40px;
          }

          .profile-icon-large {
            width: 120px;
            height: 120px;
            border-radius: 15px;
            object-fit: cover;
            border: 3px solid var(--light);
          }

          .about-text h3 {
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 1.4rem;
          }

          .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
          }

          .tech-tile {
            background: var(--white);
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease;
            border-bottom: 3px solid transparent;
          }

          .tech-tile:hover {
            transform: translateY(-5px);
            border-bottom: 3px solid var(--primary);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          }

          .tech-tile i {
            font-size: 2.2rem;
            color: var(--primary);
            margin-bottom: 12px;
            display: block;
          }

          .tech-tile span {
            font-weight: bold;
            color: var(--dark);
          }

          .news-container {
            background: var(--white);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }

          .news-item {
            display: flex;
            padding: 15px 20px;
            border-bottom: 1px solid var(--border);
          }

          .news-item:last-child {
            border-bottom: none;
          }

          .news-date {
            min-width: 110px;
            font-weight: bold;
            color: var(--primary);
          }

          .github-card {
            background: #24292e;
            color: var(--white);
            padding: 40px;
            border-radius: 12px;
            text-align: center;
          }

          .btn-github {
            display: inline-block;
            background: var(--primary);
            color: white;
            padding: 10px 25px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 15px;
            font-weight: bold;
          }

          footer {
            text-align: center;
            padding: 40px;
            color: #888;
          }

          @media (max-width: 700px) {
            .about-me-card {
              flex-direction: column;
              text-align: center;
            }
            .header-content {
              flex-direction: column;
            }
            .news-item {
              flex-direction: column;
            }
          }
        `}</style>
      </Head>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="profile-group">
              <img src="icon.png" alt="rielu" className="profile-icon-nav" />
              <h1>rielu</h1>
            </div>
            <nav>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#news">News</a>
                </li>
                <li>
                  <a href="#github">GitHub</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="container">
        <section id="about" className="section">
          <h2>
            <i className="fa-solid fa-user"></i> About Me
          </h2>
          <div className="about-me-card">
            <img src="icon.png" alt="rielu" className="profile-icon-large" />
            <div className="about-text">
              <h3>rielu</h3>
              <p>
                りえる / Rielu (@namonakiheimin)
                <br />
                インフラエンジニアリングとコンテナ技術に熱中している開発者です。
                <br />
                自宅ラボでのサーバー構築を趣味としており、Proxmox や Kubernetes を用いたインフラの自動化や、IPv6 メインのネットワーク環境構築に取り組んでいます。
                <br />
                「複雑なものをシンプルに、不便なものを自動化で快適に」をモットーに、日々手を動かして新しい技術を検証しています。
                <br />
                Technical Interests:
                <br />
                Infrastructure: Kubernetes (MicroK8s, Kind), Proxmox, Linux
                <br />
                Networking: IPv6, Cloudflare, SSL/TLS (cert-manager)
                <br />
                Development: HTML/CSS, Web Projects (Uniproject)
                <br />
              </p>
            </div>
          </div>
          <h2>
            <i className="fa-solid fa-layer-group"></i> Tech Stack
          </h2>
          <div className="tech-grid">
            <div className="tech-tile">
              <i className="fa-solid fa-dharmachakra"></i>
              <span>Kubernetes</span>
            </div>
            <div className="tech-tile">
              <i className="fa-solid fa-server"></i>
              <span>Proxmox</span>
            </div>
            <div className="tech-tile">
              <i className="fa-brands fa-linux"></i>
              <span>Linux</span>
            </div>
            <div className="tech-tile">
              <i className="fa-solid fa-diagram-project"></i>
              <span>Uniproject</span>
            </div>
          </div>
        </section>
        <section id="news" className="section">
          <h2>
            <i className="fa-solid fa-bullhorn"></i> News
          </h2>
          <div className="news-container">{renderNewsItems(posts)}</div>
        </section>
        <section id="github" className="section">
          <h2>
            <i className="fa-brands fa-github"></i> GitHub
          </h2>
          <div className="github-card">
            <p>各プロジェクトのソースコードや、マニフェストファイルを公開しています。</p>
            <a href="https://github.com/penti-nameko" className="btn-github" target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 rielu. all rights reserved.</p>
      </footer>
    </>
  );
}
