import React, { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ChevronRight,
  Gauge,
  Sparkles,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";
import "./styles.css";
import "./works.css";
import "./car.css";

const works = [
  {
    id: "01",
    tag: "IMAGE GEN",
    name: "การสร้างรูปด้วย AI",
    zero: "สร้างภาพรถสปอร์ตเท่ ๆ สักคัน",
    first: "ภาพรถสปอร์ตสีเข้มทั่วไป สวย แต่ขาดเอกลักษณ์และรายละเอียดวิศวกรรม",
    few: "สร้าง McLaren 720S สี Papaya ตัดนีออนฟ้า มี Active Rear Wing ในสไตล์ Cinematic Concept Art",
    fresh: "Concept Art ที่มีรุ่นรถ คู่สี และชิ้นส่วนจริงชัดเจน",
    reflection:
      "ความเฉพาะเจาะจงเปลี่ยนผลลัพธ์จากภาพสุ่ม ให้มีภาษาออกแบบที่ตรงโจทย์",
    visual: "image",
  },
  {
    id: "02",
    tag: "DESMOS",
    name: "ความสัมพันธ์ทางคณิตศาสตร์",
    zero: "สร้างกราฟความเร็วของรถสปอร์ต",
    first: "ได้สมการเส้นตรง y = 20x ที่เร่งขึ้นไม่สิ้นสุด",
    few: "สร้างแบบจำลอง v(t) ที่มีแรงต้านอากาศ ความเร็วสูงสุด 341 km/h และแสดงอนุพันธ์ a(t)",
    fresh: "กราฟโค้งลู่เข้าหา Top Speed พร้อมค่า G-Force ที่ลดลงตามความจริง",
    reflection:
      "เมื่อระบุฟิสิกส์จริงและรูปแบบกราฟ AI ช่วยเปลี่ยนกราฟนิ่งเป็น simulation ได้",
    visual: "graph",
  },
  {
    id: "03",
    tag: "MERMAID",
    name: "การสร้าง Diagram",
    zero: "สร้างแผนภาพระบบการส่งกำลังของรถสปอร์ต",
    first: "ได้ flowchart 3 กล่องที่บอกลำดับทั่วไปเท่านั้น",
    few: "เขียน Mermaid classDiagram สำหรับ ECU, Sensors, Active Wing และ Data Flow",
    fresh: "ผัง Embedded System ที่มี Module, attributes และ methods ชัดเจน",
    reflection:
      "การระบุชนิด diagram และบทบาท module ทำให้แผนภาพใช้ต่อในงานวิศวกรรมได้",
    visual: "diagram",
  },
  {
    id: "04",
    tag: "LATEX",
    name: "บทความด้วย LaTeX",
    zero: "เขียนบทความวิชาการเรื่องแรงกดของรถสปอร์ต",
    first: "ได้บทความอังกฤษภาพรวม มีสมการพื้นฐาน แต่ยังไม่รองรับภาษาไทย",
    few: "สร้างบทความไทย XeLaTeX ฟอนต์ Loma พร้อมสมการ Fz ตาราง Active Wing และ ECU",
    fresh: "รายงาน 1 หน้าพร้อมคอมไพล์ PDF ที่มีตารางและสมการครบ",
    reflection:
      "กำหนดฟอนต์ ภาษา ตาราง และ engine ให้ชัด ทำให้ AI สร้างเอกสารพร้อมใช้ได้",
    visual: "latex",
  },
  {
    id: "05",
    tag: "NOTEBOOKLM",
    name: "สไลด์สรุปด้วย NotebookLM",
    zero: "สรุปความเชื่อมโยงของไฟล์วิจัย กราฟ และผังระบบ",
    first: "ได้ Mind Map และบทสรุปกว้าง ๆ ยังไม่พร้อมนำเสนอ",
    few: "สร้างโครงร่างสไลด์วิศวกรรม 5 หน้า จากกราฟ, class diagram และบทความวิจัย",
    fresh: "ชุดสไลด์ที่มีหัวข้อ ลำดับการเล่า และข้อมูลเทคนิคพร้อมบรรยาย",
    reflection:
      "การกำหนดจำนวนสไลด์และโครงสร้างช่วยให้สังเคราะห์หลายแหล่งข้อมูลได้ตรงเป้า",
    visual: "slides",
  },
  {
    id: "06",
    tag: "WEB",
    name: "เว็บไซต์สำหรับ GitHub",
    zero: "สร้างเว็บไซต์เกี่ยวกับรถสปอร์ต",
    first: "ได้หน้าเว็บทั่วไปที่ไม่มีธีมและจุดยืนที่ชัดเจน",
    few: "สร้าง React + Vite + Tailwind + GSAP ในโลก Hi-tech McLaren พร้อม Showcase Prompting",
    fresh: "เว็บไซต์ PROMPT/DRIVE ที่นำเสนอผลงานแบบ interactive และ responsive",
    reflection:
      "เมื่อกำหนด tech stack, visual direction และ user journey เว็บจะกลายเป็นชิ้นงานที่มีตัวตน",
    visual: "web",
  },
];

function Visual({ type }) {
  return (
    <div
      className={`visual visual-${type}`}
      aria-label={`${type} result preview`}
    >
      <div className="visual-top">
        <i />
        <i />
        <i />
      </div>
      {type === "image" && (
        <>
          <img
            src="https://media.canva.com/v2/image-resize/format:PNG/height:1024/quality:100/uri:ifs%3A%2F%2FM%2Fb79ea60d-c253-422c-8277-4561a4103cd6/watermark:F/width:1024?csig=AAAAAAAAAAAAAAAAAAAAAH2ZyxjUwcB8n5FN-esapSWmC_a2TkS4_dyaR0nG22Zq&exp=1788803093&osig=AAAAAAAAAAAAAAAAAAAAAPdeJd30SB3uHerg4WNbtuL5jxhEx8O5_oeScQ1hBWag&signer=media-rpc&x-canva-quality=screen_3x"
            alt="mclaren720s"
          />
          <b>720S / PAPAYA</b>
        </>
      )}
      {type === "graph" && (
        <>
          <svg viewBox="0 0 260 115">
            <path d="M5 108 C65 105 76 38 165 17 S238 9 254 8" />
          </svg>
          <b>v(t) → 341 km/h</b>
        </>
      )}
      {type === "diagram" && (
        <>
          <div className="node a">ECU</div>
          <div className="node b">SENSOR</div>
          <div className="node c">WING</div>
          <span className="edge e1" />
          <span className="edge e2" />
        </>
      )}
      {type === "latex" && (
        <>
          <b className="paper-title">Active Wing Dynamics</b>
          <span className="formula">
            F<sub>z</sub> = ½ρv²C<sub>L</sub>A
          </span>
          <div className="paper-lines" />
        </>
      )}
      {type === "slides" && (
        <>
          <div className="slide-thumb one">
            <img
              src="/assets/McLaren_Active_Aerodynamics_-_Slide_1.png"
              height="100%"
              alt="สไลด์ 1"
              className="!h-full"
            />
          </div>
          <div className="slide-thumb two">
            <img
              src="/assets/McLaren_Active_Aerodynamics_-_Slide_2.png"
              height="100%"
              alt="สไลด์ 1"
              className="!h-full"
            />
          </div>
          <div className="slide-thumb three">
            <img
              src="/assets/McLaren_Active_Aerodynamics_-_Slide_3.png"
              height="100%"
              alt="สไลด์ 1"
              className="!h-full"
            />
          </div>
          <div className="slide-thumb four">
            <img
              src="/assets/McLaren_Active_Aerodynamics_-_Slide_4.png"
              height="100%"
              alt="สไลด์ 1"
              className="!h-full"
            />
          </div>
          <div className="slide-thumb five">
            <img
              src="/assets/McLaren_Active_Aerodynamics_-_Slide_5.png"
              height="100%"
              alt="สไลด์ 1"
              className="!h-full"
            />
          </div>

          <b>5-SLIDE DECK</b>
        </>
      )}
      {type === "web" && (
        <>
          <div className="mini-browser">
            <span>PROMPT/DRIVE</span>
            <strong>
              BUILT FOR
              <br />
              PRECISION.
            </strong>
          </div>
        </>
      )}
    </div>
  );
}

function WorkCard({ work }) {
  return (
    <article className="work-card">
      <header>
        <span>{work.id}</span>
        <b>{work.tag}</b>
        <h3>{work.name}</h3>
      </header>
      <div className="proof-grid">
        <div className="stage">
          <small>01 / ZERO-SHOT</small>
          <p>“{work.zero}”</p>
        </div>
        <div className="stage">
          <small>02 / ผลลัพธ์แรก</small>
          <p>{work.first}</p>
        </div>
        <div className="stage hot-stage">
          <small>03 / FEW-SHOT</small>
          <p>“{work.few}”</p>
        </div>
        <div className="stage">
          <small>04 / ผลลัพธ์ใหม่</small>
          <p>{work.fresh}</p>
        </div>
        <div className="stage reflection">
          <small>05 / REFLECTION</small>
          <p>{work.reflection}</p>
        </div>
      </div>
      <Visual type={work.visual} />
    </article>
  );
}

function Car() {
  return (
    <div className="car-wrap" aria-label="McLaren-inspired concept car">
      <div className="beam beam-a" />
      <div className="beam beam-b" />
      <div className="car-glow" />
      <img
        className="car-photo"
        src="/assets/mclaren-720s-vector.jpg"
        alt="รถสปอร์ต McLaren 720S สีส้ม"
      />
    </div>
  );
}

function App() {
  const root = useRef(null);
  const [idea, setIdea] = useState("");
  const [answer, setAnswer] = useState("");
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".hero-copy > *", {
        y: 42,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
        delay: 0.15,
      });
      gsap.from(".car-wrap", {
        x: 130,
        opacity: 0,
        scale: 0.86,
        duration: 1.4,
        ease: "expo.out",
        delay: 0.1,
      });
      gsap.to(".car", {
        y: -10,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".beam", {
        opacity: 0.92,
        scaleX: 1.12,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);
  const upgrade = () =>
    setAnswer(
      idea
        ? `PROMPT UPGRADED → “ในบทบาท Creative Director จงออกแบบ ${idea} โดยระบุกลุ่มเป้าหมาย, mood, วัสดุ และรูปแบบผลลัพธ์”`
        : "พิมพ์ไอเดียสั้น ๆ ก่อน แล้วระบบจะช่วยเพิ่มพิกัดให้",
    );
  return (
    <main ref={root} className="site-shell">
      <div className="grid-floor" />
      <div className="grain" />
      <nav>
        <a className="logo nav-item" href="#top">
          PROMPT<span>/</span>DRIVE
        </a>
        <div className="nav-links">
          <a className="nav-item" href="#method">
            METHOD
          </a>
          <a className="nav-item" href="#lab">
            PROMPT LAB
          </a>
          <a className="nav-item pill" href="#lab">
            START <ArrowDownRight size={14} />
          </a>
        </div>
      </nav>
      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            AI PROMPTING SHOWCASE / ส่ง อ.อภิมุข
          </p>
          <h1>
            BUILT FOR
            <br />
            <em>PRECISION.</em>
          </h1>
          <p className="intro">
            งานส่ง อ.อภิมุข: 6 ผลงานที่แสดงการพัฒนา Prompt แบบครบลูป
            จากคำสั่งแรกสู่ผลลัพธ์ที่ใช้งานได้จริง
          </p>
          <a className="cta" href="#works">
            VIEW ALL 6 WORKS <ChevronRight size={18} />
          </a>
        </div>
        <div className="machine">
          <div className="machine-tag">
            MCL/720S <span>• LIVE CONCEPT</span>
          </div>
          <Car />
          <div className="spec spec-left">
            <Gauge size={17} />
            <b>341</b>
            <small>KM/H TOP SPEED</small>
          </div>
          <div className="spec spec-right">
            <Zap size={17} />
            <b>02.9</b>
            <small>0-100 SEC</small>
          </div>
        </div>
        <div className="scroll-hint">
          SCROLL TO IGNITE <span />
        </div>
      </section>
      <section id="works" className="works">
        <div className="works-intro">
          <p className="eyebrow">
            <span />
            01—06 / EVIDENCE LOG
          </p>
          <h2>
            ZERO TO
            <br />
            <em>SHOWTIME.</em>
          </h2>
          <p>
            ทุกชิ้นงานใช้โครงเดียวกัน เพื่อให้เห็นชัดว่า “รายละเอียดที่เพิ่ม”
            เปลี่ยนคุณภาพของผลลัพธ์อย่างไร
          </p>
        </div>
        <div className="work-list">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      <footer>
        <span>PROMPT/DRIVE</span>
        <span>DESIGNED FOR BETTER QUESTIONS</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
createRoot(document.getElementById("root")).render(<App />);
