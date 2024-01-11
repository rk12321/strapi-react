import React from 'react'

function Welcome() {
  
    return (
      <div className="mx-auto w-full max-w-7xl px-2 md:px-4" style={{"height":"80vh"}}>
        <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
          <div className="lg:flex lg:items-center lg:space-x-10">
            <img
              src="https://illustrations.popsy.co/white/resistance-band.svg"
              alt="question-mark"
              className="h-[300px] w-auto"
            />
            <div>
              <p className="mt-6 text-sm font-semibold text-black">404 error</p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                We can&apos;t find that page
              </h1>
              <p className="mt-4 text-gray-500">
                Sorry, the page you are looking for doesn&apos;t exist or has been moved.
              </p>
            </div>
          </div>
        </div>
        <hr />

        <div className="mx-auto flex max-w-7xl justify-center">
          <footer className="px-4 py-10">
            <p className="text-base font-semibold text-gray-700">© 2023 DevUI Component Library</p>
          </footer>
        </div>
      </div>
    )
}

export default Welcome

