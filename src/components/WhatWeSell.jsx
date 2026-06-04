function WhatWeSell() {
    return (
        <section className="py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-10">
                Why Shop With Us?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border rounded p-6 text-center">
                    <h3 className="font-semibold mb-2">
                        Free Shipping
                    </h3>
                    <p className="text-sm text-gray-600">
                        Fast and reliable delivery on all orders.
                    </p>
                </div>

                <div className="border rounded p-6 text-center">
                    <h3 className="font-semibold mb-2">
                        Easy Returns
                    </h3>
                    <p className="text-sm text-gray-600">
                        Hassle-free returns and refunds.
                    </p>
                </div>

                <div className="border rounded p-6 text-center">
                    <h3 className="font-semibold mb-2">
                        Secure Payments
                    </h3>
                    <p className="text-sm text-gray-600">
                        Your transactions are always protected.
                    </p>
                </div>

                <div className="border rounded p-6 text-center">
                    <h3 className="font-semibold mb-2">
                        24/7 Support
                    </h3>
                    <p className="text-sm text-gray-600">
                        We're here whenever you need help.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default WhatWeSell;