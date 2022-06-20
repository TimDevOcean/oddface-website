import { Grid } from '@mui/material';
import React from 'react'



export const StayOdd = () => {
  return (
    <div className='app-container'>
        <main className='stay-odd'>
           <h3>For us, being ODD means being</h3><hr />
           <Grid container>
            <Grid className='grid' container item spacing={15}>
                <Grid item md={7}>
                    <h2><span className="highlight">O</span>riginal</h2>
                    <p>
                        Everybody has something to offer. <br/>We all have unique 
                        abilities and when we discover them, it leads us to 
                        creating our own path and there's nothing more fulfilling than that.
                    </p>
                </Grid>
                <Grid item md={5}>
                    <img alt="Original" src="https://oddfaceforever.com/wp-content/uploads/2019/08/tim2.jpg" />
                </Grid>
            </Grid>

            <Grid className='grid' container item spacing={15}>
                <Grid item md={5}>
                    <img alt="Daring" src="https://oddfaceforever.com/wp-content/uploads/2019/08/oddfits.jpg" />
                </Grid>            
                <Grid item md={7}>
                    <h2><span className="highlight">D</span>aring</h2>
                    <p>
                    After discovering ourselves and abilities, 
                    the only thing that holds us back is fear. 
                    Fear of being judged or looked down upon if things don't work out. 
                    Embrace your fears, don't fight it. You can always try again or explore new ideas.
                    </p>
                </Grid>
            </Grid>

            <Grid className='grid' container item spacing={15}>
                <Grid item md={7}>
                    <h2><span className="highlight">D</span>ifferent</h2>
                    <p>
                        Being different is being yourself.
                    </p>
                </Grid>
                <Grid item md={5}>
                    <img alt="Original" src="https://oddfaceforever.com/wp-content/uploads/2019/12/tim-800x800.jpg" />
                </Grid>
            </Grid>
           </Grid>
        </main>
    </div>
  )
}

export default StayOdd;
