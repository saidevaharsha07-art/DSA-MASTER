// components/settings/SettingsSidebar.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SettingsSidebar.module.css";
import {
  Palette,
  Brain,
  Sword,
  Target,
  BookOpen,
  Bell,
  Link2,
  Cloud,
  Shield,
  Zap,
  Settings as SettingsIcon,
  CircleHelp,
} from "lucide-react";

/**
 * Data structures – future‑proof, scalable.
 */
 type Item = {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  /** Optional tiny status badge */
  status?: React.ReactNode;
 };

 type Section = {
  title: string;
  items: Item[];
 };

 const SETTINGS_SECTIONS: Section[] = [
  {
    title: "PERSONALIZATION",
    items: [
      {
        key: "appearance",
        title: "Appearance",
        subtitle: "Customize themes, colors and layout",
        icon: Palette,
      },
      {
        key: "learning",
        title: "Learning Engine",
        subtitle: "Spaced repetition, review and retention",
        icon: Brain,
      },
    ],
  },
  {
    title: "LEARNING",
    items: [
      {
        key: "practice",
        title: "Practice",
        subtitle: "Problem solving preferences",
        icon: Sword,
      },
      {
        key: "goals",
        title: "Goals & Progress",
        subtitle: "Track milestones and achievements",
        icon: Target,
      },
      {
        key: "revision",
        title: "Revision Center",
        subtitle: "Smart revision settings",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        key: "notifications",
        title: "Notifications",
        subtitle: "Alerts, reminders and updates",
        icon: Bell,
        status: <span className={styles.badge}>2 pending</span>,
      },
      {
        key: "integrations",
        title: "Integrations",
        subtitle: "Connect external platforms",
        icon: Link2,
      },
      {
        key: "cloud",
        title: "Cloud Sync",
        subtitle: "Backup and synchronize",
        icon: Cloud,
        status: <span className={styles.badgeSuccess}>🟢 Connected</span>,
      },
    ],
  },
  {
    title: "APPLICATION",
    items: [
      {
        key: "privacy",
        title: "Privacy & Data",
        subtitle: "Security and permissions",
        icon: Shield,
        status: <span className={styles.badgeInfo}>Protected</span>,
      },
      {
        key: "performance",
        title: "Performance",
        subtitle: "Visual quality and optimization",
        icon: Zap,
        status: <span className={styles.badgeInfo}>Balanced</span>,
      },
      {
        key: "advanced",
        title: "Advanced",
        subtitle: "Developer and experimental features",
        icon: SettingsIcon,
      },
    ],
  },
 ];

/**
 * SettingsSidebar – polished AAA‑quality component with smooth scroll support.
 */
 export const SettingsSidebar: React.FC<{ activeKey?: string; onSelect?: (key: string) => void }> = ({ activeKey = "appearance", onSelect }) => {
  const [internalActive, setInternalActive] = useState(activeKey);

  const handleSelect = (key: string) => {
    if (onSelect) {
      onSelect(key);
    } else {
      setInternalActive(key);
    }
  };

  return (
    <aside className={styles.sidebar} aria-label="Settings navigation">
      {/* Header (fixed at top of sidebar) */}
      <header className={styles.header}>CONTROL CENTER</header>

      {/* Smooth Scrollable Container */}
      <div className={styles.scrollContainer}>
        {/* Sections */}
        <nav className={styles.nav}>
          {SETTINGS_SECTIONS.map((section) => (
            <div key={section.title} className={styles.section}>
              <div className={styles.sectionTitle}>{section.title}</div>
              {section.items.map((item) => {
                const isActive = (onSelect ? activeKey : internalActive) === item.key;
                const ItemIcon = item.icon;
                return (
                  <motion.button
                    key={item.key}
                    className={`${styles.item} ${isActive ? styles.active : ""}`}
                    onClick={() => handleSelect(item.key)}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.18 }}
                  >
                    <ItemIcon
                      className={styles.icon}
                      size={22}
                      strokeWidth={1.75}
                    />
                    <div className={styles.texts}>
                      <span className={styles.title}>{item.title}</span>
                      <span className={styles.subtitle}>{item.subtitle}</span>
                    </div>
                    {item.status && <div className={styles.status}>{item.status}</div>}
                  </motion.button>
                );
              })}
              <div className={styles.divider} />
            </div>
          ))}
        </nav>

        {/* Bottom support card */}
        <section className={styles.bottomCard} role="button" tabIndex={0}>
          <div className={styles.bottomDivider} />
          <div className={styles.bottomContent}>
            <CircleHelp className={styles.bottomIcon} size={20} strokeWidth={1.75} />
            <div className={styles.bottomTexts}>
              <span className={styles.bottomTitle}>Need Help?</span>
              <span className={styles.bottomSubtitle}>Documentation • Community • Contact Support</span>
            </div>
          </div>
          <div className={styles.bottomDivider} />
        </section>
      </div>
    </aside>
  );
};
