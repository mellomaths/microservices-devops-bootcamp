//rcc
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile"
            name="twitter"
            value={this.state.twitter}
            icon="fab fa-twitter"
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Youtube Channel URL"
            name="youtube"
            value={this.state.youtube}
            icon="fab fa-youtube"
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Facebook URL"
            name="facebook"
            value={this.state.facebook}
            icon="fab fa-facebook"
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            value={this.state.linkedin}
            icon="fab fa-linkedin"
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Instagram Profile"
            name="instagram"
            value={this.state.instagram}
            icon="fab fa-instagram"
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    const options = [
      { label: "* Situação Profissional", value: "0" },
      { label: "SysAdmin", value: "SysAdmin" },
      { label: "Developer", value: "Developer" },
      { label: "SRE", value: "SRE" },
      { label: "Gerente", value: "Gerente" },
      { label: "Estagiário", value: "Estagiário" },
      { label: "Instrutor ou Professor", value: "Instrutor ou Professor" },
      { label: "Outros", value: "Outros" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row" />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Crie seu Perfil</h1>
            <p className="lead text-center">
              Preencha com suas melhores informações
            </p>
            <small className="d-block pb-3">* = Campo obrigatório</small>

            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* escolha-sua-uri"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="Sua URL pública. Ex. questcode.org/escolha-sua-uri"
              />

              <SelectListGroup
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                options={options}
                error={errors.status}
                info="Qual sua atual posição"
              />

              <TextFieldGroup
                placeholder="Empresa"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
                info="Onde você trabalha atualmente?"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Seu site, ou de sua empresa"
              />
              <TextFieldGroup
                placeholder="Cidade"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="Cidade e Estado (ex. Barueri, SP)"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Separados por vírgula (ex. Java,Angular,Jenkins,Kubernetes)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={this.state.githubusername}
                onChange={this.onChange}
                error={errors.githubusername}
                info="Caso queira exibir seus últimos repositórios"
              />
              <TextAreaFieldGroup
                placeholder="Biografia Resumida"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Conte um pouco sobre você"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className="btn btn-light"
                >
                  Informar Redes Sociais
                </button>
                <span className="text-muted">Optional</span>
              </div>

              {socialInputs}
              <input
                type="submit"
                value="Salvar"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
