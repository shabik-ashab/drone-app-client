import React from 'react'

const Contact = () => {
    return (
        <div className="mb-5">
            <header>
        <h1 className="text-center mt-3  mb-5">Contact Us</h1>
      </header>
      <div className="container contact">
        <div className="row p-3">
            <div className="col-lg-6">
            <h1>Brooklyn,New York</h1>
                <p>849 Diamond Str,07th floor,Ny 10012,New York,</p>
                <p>United States America</p>
                <p  className="text-primary">Email: info@healthcare.com</p>
                <div className="call-work mt-4">
                  <h5>Work Hours:</h5>
                  <p  className="text-primary">Mon - Sat: 8.00 - 17.00, Sunday Closed</p>
                </div>
            </div>
            <div className="col-lg-6">
            <div className="call-work mt-4">
                <h5>Call Directly</h5>
                <h1 className="text-primary">+880 123 456</h1>
                </div>
                <div className="call-work mt-4">
                  <h5>Brand Officers:</h5>
                  <p  className="text-primary">Allenton Pa | Allanta, GA | Chicago IL | Dallas TX,</p>
                  <p  className="text-primary">Edison, NJ | Houston, TX</p>
                </div>
                
            </div>

            </div>  
      </div>
        </div>
    )
}

export default Contact
