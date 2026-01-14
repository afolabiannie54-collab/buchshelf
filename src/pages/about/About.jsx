import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./About.module.css";

export default function AboutPage() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      disable: "mobile", // Respect reduced motion and disable on mobile for performance
    });
  }, []);

  return (
    <main className={styles.container}>
      {/* Hero with Bookshelf SVG Background */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent} data-aos="fade-up">
          <h1 className={styles.heroTitle}>Behind the Shelf</h1>
          <p className={styles.heroSubtitle}>
            BuchShelf is a calm companion for intentional reading — a place to
            gather the books that matter, track your journey, and rediscover why
            you read.
          </p>
          <div className={styles.heroButtons}>
            {isLoggedIn ? (
              <Link className={styles.btnPrimary} to="/library">
                Go to Your Library
              </Link>
            ) : (
              <Link className={styles.btnPrimary} to="/signup">
                Create Your Account
              </Link>
            )}
            <Link className={styles.btnSecondary} to="/genres">
              Explore Genres
            </Link>
          </div>
        </div>
      </section>

      {/* Why Section - Overlapping Layout */}
      <section className={styles.whySection}>
        <div className={styles.whyWrapper}>
          <div className={styles.whyTextBlock} data-aos="fade-right">
            <span className={styles.labelText}>Why BuchShelf</span>
            <h2 className={styles.whyHeading}>
              Reading is personal. Recommendations are everywhere, but peace is
              rare.
            </h2>
            <p className={styles.whyParagraph}>
              BuchShelf helps you keep a gentle grip on your reading life —
              fewer tabs, more intention, and a simple record of where you've
              been and where you're going.
            </p>
          </div>
          <div className={styles.whyAccent}></div>
        </div>
      </section>

      {/* How It Helps - Flowing Typography Layout */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <h2 className={styles.howTitle} data-aos="fade-up">
            How It Helps
          </h2>

          <div className={styles.personaFlow}>
            <div
              className={styles.personaBlock}
              style={{ "--accent-color": "#9caf88" }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className={styles.personaLabel}>The Curious Browser</span>
              <p className={styles.personaText}>
                Save finds and wander genres without losing track.
              </p>
            </div>

            <div
              className={styles.personaBlock}
              style={{ "--accent-color": "#f4a460" }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <span className={styles.personaLabel}>The Mood Reader</span>
              <p className={styles.personaText}>
                Keep flexible shelves; move books between statuses effortlessly.
              </p>
            </div>

            <div
              className={styles.personaBlock}
              style={{ "--accent-color": "#c2674f" }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className={styles.personaLabel}>The Goal Setter</span>
              <p className={styles.personaText}>
                Set a yearly target and get a gentle pace reminder.
              </p>
            </div>

            <div
              className={styles.personaBlock}
              style={{ "--accent-color": "#d46a6a" }}
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <span className={styles.personaLabel}>The Collector</span>
              <p className={styles.personaText}>
                Favorite the books you cherish and revisit them easily.
              </p>
            </div>

            <div
              className={styles.personaBlock}
              style={{ "--accent-color": "#6b8e23" }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className={styles.personaLabel}>The Returning Reader</span>
              <p className={styles.personaText}>
                See progress at a glance and restart with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles - Magazine Style Layout */}
      <section className={styles.principlesSection}>
        <div className={styles.principlesInner}>
          <div className={styles.principlesHeader} data-aos="fade-up">
            <h2 className={styles.principlesTitle}>Our Principles</h2>
            <div className={styles.principlesLine}></div>
          </div>

          <div className={styles.principlesList}>
            <article
              className={styles.principleItem}
              data-aos="fade-left"
              data-aos-delay="50"
            >
              <div className={styles.principleNumber}>01</div>
              <div className={styles.principleContent}>
                <h3>Calm</h3>
                <p>Minimal friction, no noise, no urgency.</p>
              </div>
            </article>

            <article
              className={styles.principleItem}
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div className={styles.principleNumber}>02</div>
              <div className={styles.principleContent}>
                <h3>Clarity</h3>
                <p>Three shelves: Want to Read, Currently Reading, Finished.</p>
              </div>
            </article>

            <article
              className={styles.principleItem}
              data-aos="fade-left"
              data-aos-delay="150"
            >
              <div className={styles.principleNumber}>03</div>
              <div className={styles.principleContent}>
                <h3>Ownership</h3>
                <p>Your library reflects you — not an algorithm.</p>
              </div>
            </article>

            <article
              className={styles.principleItem}
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className={styles.principleNumber}>04</div>
              <div className={styles.principleContent}>
                <h3>Accessibility</h3>
                <p>Thoughtful focus, readable type, reduced motion options.</p>
              </div>
            </article>

            <article
              className={styles.principleItem}
              data-aos="fade-left"
              data-aos-delay="250"
            >
              <div className={styles.principleNumber}>05</div>
              <div className={styles.principleContent}>
                <h3>Respect</h3>
                <p>We value your time and attention.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Features - Asymmetric Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresInner}>
          <h2 className={styles.featuresTitle} data-aos="fade-up">
            Features Snapshot
          </h2>

          <div className={styles.featuresLayout}>
            <div
              className={styles.featureBox}
              style={{ "--box-color": "#9caf88" }}
              data-aos="zoom-in"
              data-aos-delay="50"
            >
              <h3>Simple Shelves</h3>
              <p>
                Want to Read, Currently Reading, Finished — nothing more,
                nothing less.
              </p>
            </div>

            <div
              className={styles.featureBox}
              style={{ "--box-color": "#f4a460" }}
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <h3>Quick Search</h3>
              <p>
                Find books fast with curated results designed for discovery.
              </p>
            </div>

            <div
              className={styles.featureBox}
              style={{ "--box-color": "#c2674f" }}
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <h3>Author Views</h3>
              <p>Explore an author's catalog and follow your curiosity.</p>
            </div>

            <div
              className={styles.featureBox}
              style={{ "--box-color": "#d46a6a" }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <h3>Favorites</h3>
              <p>Heart the books you love and keep them close.</p>
            </div>

            <div
              className={styles.featureBox}
              style={{ "--box-color": "#6b8e23" }}
              data-aos="zoom-in"
              data-aos-delay="250"
            >
              <h3>Privacy</h3>
              <p>Your data stays with you; we keep things simple and local.</p>
            </div>

            <div
              className={styles.featureBox}
              style={{ "--box-color": "#8b5e3c" }}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <h3>Accessible</h3>
              <p>
                Readable type, clear focus, and motion that respects your
                settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Roadmap - Split Screen */}
      <section className={styles.splitSection}>
        <div className={styles.splitLeft} data-aos="fade-right">
          <h2 className={styles.splitTitle}>Trust & Privacy</h2>

          <div className={styles.trustContent}>
            <div className={styles.trustPoint}>
              <h3>Your Library</h3>
              <p>
                Your account and library are stored locally for this project.
                Clear them anytime.
              </p>
            </div>

            <div className={styles.trustPoint}>
              <h3>Data Source</h3>
              <p>
                We use public data from Google Books. Results are curated for
                quality.
              </p>
            </div>

            <div className={styles.trustPoint}>
              <h3>Respect</h3>
              <p>
                No dark patterns, no pressure — just a helpful companion for
                reading.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.splitRight} data-aos="fade-left">
          <h2 className={styles.splitTitle}>What's Next</h2>

          <div className={styles.roadmapContent}>
            <div className={styles.roadmapPoint}>
              <div className={styles.roadmapIcon}></div>
              <p>More curated genre collections.</p>
            </div>

            <div className={styles.roadmapPoint}>
              <div className={styles.roadmapIcon}></div>
              <p>Optional enhancements for visuals and pacing insights.</p>
            </div>

            <div className={styles.roadmapPoint}>
              <div className={styles.roadmapIcon}></div>
              <p>Small comforts that make reading feel more like home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className={styles.finalCta}>
        <div className={styles.ctaOverlay}></div>
        <div className={styles.ctaContent} data-aos="fade-up">
          <h2>Ready to start your reading journey?</h2>
          <p>Join BuchShelf and create your personal library today.</p>
          <div className={styles.ctaButtons}>
            {!isLoggedIn && (
              <Link to="/signup" className={styles.ctaBtnPrimary}>
                Create Account
              </Link>
            )}
            <Link to="/contact" className={styles.ctaBtnSecondary}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className={styles.footer}>
        <p>Books data courtesy of Google Books API</p>
      </footer>
    </main>
  );
}
