import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

import { publicFetch } from "../../../util/fetcher";

import { Spinner } from "../../icons";

import styles from "./avatar-card.module.css";
import { FetchContext } from "../../../store/fetch";

const UserAvatar = ({ username }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { authAxios } = useContext(FetchContext);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await authAxios.get(`auth/users/me/`);
      setUserInfo(data);
      console.log("fff", data, userInfo);
    };

    fetchUser();
  }, [username]);

  return (
    <div>
      <div className={styles.avatarCard}>
        {/* {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : ( */}
        <div className={styles.avatar}>
          <Link href="/users/[username]" as={`/users/${username}`}>
            <a>
              <img
                src={`https://avatars.dicebear.com/api/human/${username}.svg`}
                alt={username}
              />
            </a>
          </Link>
        </div>
        {/* )} */}
        <h2 className={styles.username}>{username}</h2>
        {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <div className={styles.created}>
            <p>
              Created:{" "}
              <span>
                {userInfo?.created &&
                  formatDistanceToNowStrict(new Date(userInfo.created), {
                    addSuffix: true,
                  })}
              </span>
            </p>
          </div>
        )}
      </div>
      <div style={{ marginTop: 20, marginLeft: 10 }}>
        <h6>email: {userInfo?.email} </h6>
        <h6>user type: {userInfo?.is_superuser ? "super" : "عادی"} </h6>
      </div>
    </div>
  );
};

export default UserAvatar;
