
const rEnrollmentBill = ({enrollment, student}) => cs(
    consumeContext("resolve"),
    ({resolve}) => {
        const class1 = resolve.getClass(enrollment.class_id);

        const {ready, missings} = isEnrollmentReadyForBilling({
            enrollment,
            student,
            class1,
        });

        if (!ready) {
            return (
                <div className="enrollment-bill-4f2">
                    <div className="name">{class1.name}</div>
                    <div className="warning">
                        {missings.map((field) => getBillingMessage(field))}
                    </div>
                </div>
            )
        }

        return (
            <div className="enrollment-bill-4f2">
                <div className="name">{class1.name}</div>
                <div className="">
                    ready to billing
                </div>
            </div>
        );
    }
);

const isEnrollmentReadyForBilling = ({enrollment, student, class1}) => {
    const checkFields = ["date_start", "date_end", "fee"];

    const checks = checkFields.map((field) => ({
        check: (info) => !info[field],
        field,
    }));

    const neededInfo = {
        fee: class1.fee,
        date_start: enrollment.date_start || class1.date_start,
        date_end: enrollment.date_end || class1.date_end,
    };

    const missings = checks.map(({check, field}) => check(neededInfo) && field).filter(v => v);

    if (missings.length === 0) {
        return {ready: true};
    }

    return {
        ready: false,
        missings,
    }
};

const getBillingMessage = (field) => {
    const names = {
        "date_start": "starting date",
        "date_end": "ending date",
        "fee": "fee",
    };

    return `Please provide the ${names[field]} for this enrollment or this class.`;
};

