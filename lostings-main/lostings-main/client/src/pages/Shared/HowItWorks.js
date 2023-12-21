import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactCard, faEnvelopeOpenText, faSearch } from "@fortawesome/free-solid-svg-icons";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-8">
        <div className="container mx-auto text-center text-navy">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="feature">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="mb-6 text-6xl"/>
              <h3 className="text-xl font-semibold mb-2">
                Report Lost or Found Items
              </h3>
              <p className='text-gray-600'>
                Quickly report any lost or found items on campus with a few
                simple clicks.
              </p>
            </div>

            <div className="feature">
            <FontAwesomeIcon icon={faSearch} className="mb-6 text-6xl"/>
              <h3 className="text-xl font-semibold mb-2">Search for Items</h3>
              <p className='text-gray-600'>
                Effortlessly search for lost items or check if your lost item
                has been found by others.
              </p>
            </div>

            <div className="feature">
            <FontAwesomeIcon icon={faContactCard} className="mb-6 text-6xl"/>
              <h3 className="text-xl font-semibold mb-2">
                Connect with Owners
              </h3>
              <p className='text-gray-600'>
                Contact the owners of found items to arrange a pickup or return.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HowItWorks
