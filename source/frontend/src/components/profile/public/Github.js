import React, { Component } from "react";
import PropTypes from "prop-types";
import env from "../../../environment";

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort } = this.state;
    //const base_url = process.env.REACT_APP_API_HOST;
    let url;
    if (env.API_URL_SCM != null) {
      url = `${env.API_URL_SCM}/api/scm/github/${username}/${count}/${sort}`;
    } else {
      url = `${env.API_URL}/api/scm/github/${username}/${count}/${sort}`;

    }
    // const url = `http://staging.api.questcode.org/scm/github/${username}/${count}/${sort}`;
    // const url = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secundary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Últimos Repositórios</h3>
        {repoItems}
      </div>
    );
  }
}

Github.propTypes = {
  username: PropTypes.string.isRequired
};

export default Github;
