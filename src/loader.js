import React from 'react'
import Loader from 'react-loader-spinner'

export default class Load extends React.Component {
 //other logic
   render() {
    return(
        <div className="loadingIcon">
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