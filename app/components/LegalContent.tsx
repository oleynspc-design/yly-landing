"use client";
import React from "react";

export type ListItem = {
  text: string;
  sub?: { type: "ol" | "ul"; items: ListItem[] };
};

export type ContentItem =
  | { type: "p"; text: string }
  | { type: "ol" | "ul"; items: ListItem[] };

export type Section = {
  title: string;
  items: ContentItem[];
};

export type LegalPageData = {
  title: string;
  lastUpdated: string;
  sections: Section[];
};

function renderListItems(items: ListItem[]) {
  return items.map((item, i) => (
    <li key={i}>
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
      {item.sub && (
        item.sub.type === "ul" ? (
          <ul>{renderListItems(item.sub.items)}</ul>
        ) : (
          <ol>{renderListItems(item.sub.items)}</ol>
        )
      )}
    </li>
  ));
}

export default function LegalContent({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <div key={i}>
          <h2>{section.title}</h2>
          {section.items.map((item, j) => {
            if (item.type === "p") {
              return <p key={j} dangerouslySetInnerHTML={{ __html: item.text }} />;
            }
            if (item.type === "ol") {
              return <ol key={j}>{renderListItems(item.items)}</ol>;
            }
            return <ul key={j}>{renderListItems(item.items)}</ul>;
          })}
        </div>
      ))}
    </>
  );
}
