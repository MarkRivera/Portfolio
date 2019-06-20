import React, { Component } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import Skills from '../Skills/Skills';
import './Home.css';
import city from './buildings-city-cityscape-2168975.jpg';
import angie from './angie.png';
import watchthis from './watchthis.png';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [
			{
				name: "WatchThis",
				photo: null,
				link: null,
				desc: "Fun, movie based app that decides what you should watch when you can't decide.",
				img: watchthis,
				gitlink: "https://github.com/MarkRivera/Watch-This",
				link: "https://agitated-wiles-65be6d.netlify.com"
			},
			{
				name: "CabrooksFilms",
				photo: null,
				link: null,
				desc: "A small business website for a media content creator.",
				img: angie,
				gitlink: "https://github.com/MarkRivera/Angie",
				link: "https://agitated-wiles-65be6d.netlify.com"
			},
			],

			onResumePage: false
		};

		this.handleLoad = this.handleLoad.bind(this);
	}

	componentDidMount() {
		if (this.state.onResumePage) {
			this.handleLoad();
		}
	}

	handleLoad() {
		console.log('hi');
	}

	render(){
		return (
				<main>
					<section className="hero" style={ {backgroundImage: 'url('+ city +')'} }>
						<header className="hero-container">
							<div className="hero-text">
								<h1 className="hero-title">Hi, I'm <span className="highlight">Mark Rivera</span></h1>
								<small className="hero-caption">I like making stuff</small>
							</div>
						</header>
					</section>

					<section className="projects-box">
						<div className="container">
							<Skills />

							<div className="project-intro">
								<h1>Projects</h1>
							</div>

							<section className="project-container" id="Projects">
								{
									this.state.projects.map((element, index) => {
										return (
											<ProjectCard
												name={element.name}
												desc={element.desc}
												key={`${element.name}${index}`}
												img={element.img}
												gitLink={element.gitlink}
												link={element.link}
											/>
										)
									})			
								}
							</section>				
						</div>
					</section>
				</main>
		)
	}
}