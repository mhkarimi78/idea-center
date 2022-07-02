import React, { useContext } from "react";

import { TagContext } from "../../../store/tag";

import Tag from "../../tag";
import { Spinner } from "../../icons";

import styles from "./extra.module.css";

const Extra = ({ marginTop = 24 }) => {
  const { tagState } = useContext(TagContext);

  return (
    <div className={styles.container}>
      <div
        className={styles.tagContainer}
        style={{ marginTop: `${marginTop}px` }}
      >
        <h2>Popular Tags</h2>
        {!tagState && (
          <div className="loading">
            <Spinner />
          </div>
        )}
        <div className={styles.popularTags}>
          {tagState?.map(({ id, title, count = 8888 }) => (
            <Tag key={id} count={count}>
              {title}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Extra;
