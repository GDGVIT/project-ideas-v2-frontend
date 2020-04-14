import React from 'react'
import Loader from 'react-loader-spinner'

export default class Load2 extends React.Component {
 //other logic
   render() {
    return(
        <div className="loadingIcon2">
                <Loader
                type="Rings"
                color="#2785FC"
                height={100}
                width={100}
                timeout={null} //3 secs
            />
        </div>

    );
   }
}