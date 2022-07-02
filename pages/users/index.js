import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";

import { publicFetch } from "../../util/fetcher";

import Layout from "../../components/layout";
import PageTitle from "../../components/page-title";
import SearchInput from "../../components/search-input";
import UserList from "../../components/user-list";
import UserItem from "../../components/user-list/user-item";
import { Spinner } from "../../components/icons";
import { FetchContext } from "../../store/fetch";

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authAxios } = useContext(FetchContext);

  useEffect(() => {
    if (searchTerm === null) {
      const fetchUser = async () => {
        const { data } = await authAxios.get("auth/users");
        setUsers(data);
      };

      fetchUser();
    } else {
      const delayDebounceFn = setTimeout(async () => {
        setLoading(true);
        const { data } = await publicFetch.get(
          searchTerm ? `/users/${searchTerm}` : `/users`
        );
        setUsers(data);
        setLoading(false);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  return (
    <Layout extra={false}>
      <Head>
        <title>Users - Idea Center</title>
      </Head>

      <PageTitle title="Users" borderBottom={false} />

      <SearchInput
        placeholder="Search by user"
        isLoading={loading}
        autoFocus
        autoComplete="off"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!users && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {users && (
        <>
          <UserList>
            {users?.map(({ username, profilePhoto, created, id, email }) => (
              <UserItem
                key={id}
                id={id}
                email={email}
                username={username}
                profilePhoto={profilePhoto}
                created={created}
              />
            ))}
          </UserList>

          {users.length == 0 && (
            <p className="not-found">No users matched your search.</p>
          )}
        </>
      )}
    </Layout>
  );
}

export default UsersPage;
