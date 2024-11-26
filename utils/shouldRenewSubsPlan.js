//* should renew subscription plan

const shouldRenewSubsPlan = (user) => {
    const today =  new Date();

    return !user?.nextBillingDate || user.nextBillingDate <= today
}

module.exports = {shouldRenewSubsPlan}