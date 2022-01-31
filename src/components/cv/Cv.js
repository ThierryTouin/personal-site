import React, {Component} from 'react';
import MyInfo from "./MyInfo";
import Employments from "./Employments";
//import NameCard from "./NameCard";
//import Education from "./Education";

const styles = {
    root: {
        padding: 50
    },
    infoBox: {
        marginBottom: '16px'
    }
};

class CV extends Component {
    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={`container ${classes.root}`}>
                    <div className={'row'}>
                        <div className={`col-12 col-lg-3 ${classes.infoBox}`}>
                            <MyInfo/>
                        </div>
                        <div className={'col-12 col-lg-9'}>
                           <Employments/> 
                           {/*  <NameCard/> */}
                            {/* <Education /> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles) (CV);