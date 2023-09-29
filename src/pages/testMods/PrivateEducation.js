import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import wedding from '../../assets/images/wedding.png';
import surgery from '../../assets/images/doctor.png';
import rental from '../../assets/images/house.png';
import retirement from '../../assets/images/retirement2.png';
import religious from '../../assets/images/celebration.png';
import travel from '../../assets/images/travel.png';
import principal from '../../assets/images/house.png';
import business from '../../assets/images/start_business.png';
import decorating from '../../assets/images/remodel2.png';
import movingState from '../../assets/images/moving.png';
import vacationHome from '../../assets/images/house.png';
import addChild from '../../assets/images/child.png';
import celebration from '../../assets/images/celebration.png';
import movingCountry from '../../assets/images/moving.png';
import education from '../../assets/images/education.png';
import collectible from '../../assets/images/collectibles_gem.png';


import { BlockLink } from '../../components/Animations';
class PrivateEducation extends Component {
    render() {
        
        return (
            <React.Fragment>                
                <div className="page-nav-history">
                    {/* <Link to="/" className="page-nav-link">
                        Home
                    </Link>
                    /
                    <Link to="/goals" className="page-nav-link">
                        Goals
                    </Link> */}
                </div>
                <div className="module-blocks">
                    <h2>SELECT A GOAL TO CREATE</h2>
                </div>
                <div className="module-blocks">
                    <BlockLink className="module-block-link" link="/goals_new/wedding" title="Wedding" img={wedding}/>
                    <BlockLink className="module-block-link" link="/goals_new/surgery" title="Cosmetic / Elective Surgery" img={surgery} />
                    <BlockLink className="module-block-link" link="/goals_new/landlord" title="Rental / Investment Property" img={rental} />
                    <BlockLink className="module-block-link" link="/goals_new/retirement" title="Retirement" img={retirement} />
                    <BlockLink className="module-block-link" link="/goals_new/religious-celebration" title="Religious Celebration" img={religious} />
                    <BlockLink className="module-block-link" link="/goals_new/travel-adventure" title="Travel and Adventure" img={travel} />
                    <BlockLink className="module-block-link" link="/goals_new/principal" title="Principal Home" img={principal} />
                    <BlockLink className="module-block-link" link="/goals_new/starting-business-new" title="Start a Business" img={business} />
                    <BlockLink className="module-block-link" link="/goals_new/remodel" title="Remodel / Decorating" img={decorating} />
                    <BlockLink className="module-block-link" link="/goals_new/moving-state-new" title="Moving Country" img={movingState} />
                    <BlockLink className="module-block-link" link="/goals_new/vacation_home" title="Vacation Home - Personal" img={vacationHome} />
                    <BlockLink className="module-block-link" link="/goals_new/add-child-new" title="Add Child to Family" img={addChild} />
                    <BlockLink className="module-block-link" link="/goals_new/party" title="Celebration / Party" img={celebration} />
                    
            
            <BlockLink className="module-block-link" link="/goals_new/add-child-new" title="Add Child to Family" img={movingCountry} />
                    
            <BlockLink className="module-block-link" link="/private-education-new/private-education" title="Private Education" img={education} />
                    
            
            
            
            <BlockLink className="module-block-link" link="/goals_new/luxury" title="Buy Luxury / Collectible" img={collectible} />
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(PrivateEducation);