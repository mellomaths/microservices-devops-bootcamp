import React, { Component } from "react";
import Moment from "react-moment";

class ExperienceEducation extends Component {
  render() {
    const { experience, education } = this.props;

    const experienceItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4 className="text-info">{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Localização:</strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Descrição:</strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const educationItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4 className="text-info">{edu.school}</h4>
        <p>
          <strong>Grau:</strong> {edu.degree}
        </p>
        <p>
          <strong>Curso:</strong> {edu.fieldofstudy}
        </p>
        <p>
          <Moment format="DD/MM/YYYY.">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Descrição:</strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center">Experiência Profissional</h3>
          {experienceItems.length > 0 ? (
            <ul className="list-group">{experienceItems}</ul>
          ) : (
            <p className="text-center">Não informado</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center">Acadêmico</h3>
          {educationItems.length > 0 ? (
            <ul className="list-group">{educationItems}</ul>
          ) : (
            <p className="text-center">Não informado</p>
          )}
        </div>
      </div>
    );
  }
}

export default ExperienceEducation;
