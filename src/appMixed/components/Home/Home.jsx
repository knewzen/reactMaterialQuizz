import React                    from 'react';
import classNames               from 'classnames';
import PromisedTimeout          from '../../services/PromisedTimeout.jsx!jsx';
import MarginTop                from '../MarginTop/MarginTop.jsx!jsx';
import MdlPaper                 from '../mdl/MdlPaper.jsx!jsx';

import Paper                    from 'material-ui/lib/paper';
import Card                     from 'material-ui/lib/card/card';
import CardActions              from 'material-ui/lib/card/card-actions';
import CardText                 from 'material-ui/lib/card/card-text';
import CardTitle                from 'material-ui/lib/card/card-title';
import {styles}                 from './home.style.jsx!jsx';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    this.state = {
      animated                    : true,
      viewEnters                  : false,
      titleTwoAnimationActive     : false,
      homeDetailsAnimationActive  : false
    };
  }
  
   
  componentDidMount(){
    console.info('home view will did mount');
    
    this.setState({
      viewEnters                 : true,
      titleTwoAnimationActive    : false, 
      homeDetailsAnimationActive : false
    });   
    
    
  //// ANIMATE WITHOUT CLASSNAME - part1 -  : init (get node then init style obj)
  //   let titleTwo = this.refs.homeViewTitleTwo;    
  //   titleTwo.style.opacity            = 0;       
  //   titleTwo.style.animationDuration  = '0.3s';
  //   titleTwo.style.animationFillMode  = 'both';

       
    let PromisedDelay = new PromisedTimeout();
    PromisedDelay
      .delay(400)
      .then(()=>{
        
        //// ANIMATE WITHOUT CLASSNAME - part2 -  : set animation (manually set style object)
        // titleTwo.style.opacity = 1;
        // titleTwo.style.animation = 'fadeInUp 0.3s both ease-in';
        // titleTwo.style.zIndex = 9999;
        
        this.setState({
          titleTwoAnimationActive : true
        });
        
        PromisedDelay
          .delay(800)
          .then(()=>{
            this.setState({
              homeDetailsAnimationActive : true
            });            
          })
      }); 
  }

  componentWillUnmount(){
    console.info('home view will unmount');
    this.setState({
      viewEnters       : false ,
      titleTwoAnimationActive     : false,
      homeDetailsAnimationActive  : false
    });     
  }

  render(){
    
    let homeViewClasses = classNames({
      'animatedViews'    : this.state.animated,
      'view-enter'       : this.state.viewEnters
    });    
    
    let homeTitle2Classes = classNames({
      'animated'    : this.state.animated,
      'invisible'   : !this.state.titleTwoAnimationActive,
      'fadeInUp'    : this.state.titleTwoAnimationActive,
    });
    
    let homeDetailsClasses = classNames({
      'animated'  : this.state.animated,
      'invisible' : !this.state.homeDetailsAnimationActive,
      'zoomIn'    : this.state.homeDetailsAnimationActive,      
    });    
    
    
    console.info(`
    ------------------------
    home renders now
    ------------------------
    `);
        
    return (       
      <section 
         key="homeView"
         className={homeViewClasses}>            
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <MdlPaper>            
              <h3>{this.context.translate.HOME_TITRE_1_QUIZZ}</h3>
              <MarginTop 
                marginTopValue={80}
                marginTopUnit={'px'} />
              <h4 
                ref="homeViewTitleTwo"
                className={homeTitle2Classes}>{this.context.translate.HOME_TITRE_2_QUIZZ}</h4>
              <p 
                ref="homeViewDetail"
                className={homeDetailsClasses}>{this.context.translate.HOME_DETAIL_TEXT}</p>
            </MdlPaper>          
          </div>
        </div>
      </section>   
    );
  }


}

Home.contextTypes = {
  muiTheme  : React.PropTypes.object,
  translate : React.PropTypes.object
}
