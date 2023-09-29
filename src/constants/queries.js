import { gql } from 'apollo-boost';

export const QL_CLIENT_LIST = gql`
    {
        clients {
            address {
                city
                country
                firstLine
                id
                postalCode
                secondLine
                state
            }
            birthdate
            charities {
                contactNumber
                contactPersonFirstName
                contactPersonLastName
                emailAddress
                id
                notes
                website
            }
            corporates {
                corporateType
                creationDate
                id
                name
                stateIncorporated
            }
            dependents {
                birthdate
                childTaxCreditEndAt
                disability
                firstName
                gender
                id
                lastName
                relationship
            }
            emailAddress
            estimatedDeathAge
            financiallyImpacteds {
                contactNumber
                contactPersonFirstName
                contactPersonLastName
                emailAddress
                firstName
                id
                lastName
                notes
                relationship
                website
            }
            firstName
            gender
            id
            investmentKnowledge
            lastName
            primaryContactNumber
            professionalContacts {
                company
                emailAddress
                firstName
                id
                lastName
                mobileContactNumber
                officeContactNumber
                profession
            }
            retirementDate
            secondaryContactNumber
            secondaryEmailAddress
            spouse {
                birthdate
                emailAddress
                estimatedDeathAge
                firstName
                gender
                id
                investmentKnowledge
                lastName
                partner
                primaryContactNumber
                retirementDate
                secondaryContactNumber
                secondaryEmailAddress
                workContactNumber
            }
            trusts {
                firstName
                id
                lastName
                name
                percentage
            }
            workContactNumber
        }
    }
`;

export const QL_CLIENT_GET = gql`
    query client($id: String!) {
        client(id: $id) {
            address {
                city
                country
                firstLine
                id
                postalCode
                secondLine
                state
            }
            birthdate
            charities {
                contactNumber
                contactPersonFirstName
                contactPersonLastName
                emailAddress
                id
                notes
                website
            }
            corporates {
                corporateType
                creationDate
                id
                name
                stateIncorporated
            }
            dependents {
                birthdate
                childTaxCreditEndAt
                disability
                firstName
                gender
                id
                lastName
                relationship
            }
            emailAddress
            estimatedDeathAge
            financiallyImpacteds {
                contactNumber
                contactPersonFirstName
                contactPersonLastName
                emailAddress
                firstName
                id
                lastName
                notes
                relationship
                website
            }
            firstName
            gender
            id
            investmentKnowledge
            lastName
            primaryContactNumber
            professionalContacts {
                company
                emailAddress
                firstName
                id
                lastName
                mobileContactNumber
                officeContactNumber
                profession
            }
            retirementDate
            secondaryContactNumber
            secondaryEmailAddress
            spouse {
                birthdate
                emailAddress
                estimatedDeathAge
                firstName
                gender
                id
                investmentKnowledge
                lastName
                partner
                primaryContactNumber
                retirementDate
                secondaryContactNumber
                secondaryEmailAddress
                workContactNumber
            }
            trusts {
                firstName
                id
                lastName
                name
                percentage
            }
            workContactNumber
        }
    }
`;

export const QL_CLIENT_ADD = gql`
    mutation createClient($data: ClientMutationAttributes){
        createClient(attributes: $data){
            address {
                city
                country
                firstLine
                id
                postalCode
                secondLine
                state
            }
            birthdate
            charities {
                contactNumber
                contactPersonFirstName
                contactPersonLastName
                emailAddress
                id
                notes
                website
            }
            corporates {
                corporateType
                creationDate
                id
                name
                stateIncorporated
            }
            dependents {
                birthdate
                childTaxCreditEndAt
                disability
                firstName
                gender
                id
                lastName
                relationship
            }
            emailAddress
            estimatedDeathAge
            financiallyImpacteds {
                contactNumber
                contactPersonFirstName
                contactPersonLastName
                emailAddress
                firstName
                id
                lastName
                notes
                relationship
                website
            }
            firstName
            gender
            id
            investmentKnowledge
            lastName
            primaryContactNumber
            professionalContacts {
                company
                emailAddress
                firstName
                id
                lastName
                mobileContactNumber
                officeContactNumber
                profession
            }
            retirementDate
            secondaryContactNumber
            secondaryEmailAddress
            spouse {
                birthdate
                emailAddress
                estimatedDeathAge
                firstName
                gender
                id
                investmentKnowledge
                lastName
                partner
                primaryContactNumber
                retirementDate
                secondaryContactNumber
                secondaryEmailAddress
                workContactNumber
            }
            trusts {
                firstName
                id
                lastName
                name
                percentage
            }
            workContactNumber
        }
    }
`;

export const QL_CLIENT_UPDATE = gql`
    mutation updateClient($id: String!, $data: ClientMutationAttributes){
        updateClient(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_CLIENT_DELETE = gql`
    mutation deleteClient($id: String!){
        deleteClient(id: $id){
            id
        }
    }
`;

export const QL_RATES_OF_RETURN_LIST = gql`
    {
        ratesOfReturns {
            monteCarloRateOfReturns {
                average
                description
                expectedAverage
                highBand
                howManyYears
                id
                lowBand
                regenerate
                startYear
            }
            ratesOfReturn {
                id
                professionalPrediction
                static
            }
            userDefinedRateOfReturns {
                howManyYears
                id
                percent
                year
            }
        }
    }
`;

export const QL_RATES_OF_RETURN_GET = gql`
    query ratesOfReturn($id: String!) {
        ratesOfReturn(id: $id) {
            monteCarloRateOfReturns {
                average
                description
                expectedAverage
                highBand
                howManyYears
                id
                lowBand
                regenerate
                startYear
            }
            ratesOfReturn {
                id
                professionalPrediction
                static
            }
            userDefinedRateOfReturns {
                howManyYears
                id
                percent
                year
            }
        }
    }
`;

export const QL_RATES_OF_RETURN_ADD = gql`
    mutation createRatesOfReturn($data: RatesOfReturnMutationAttributes){
        createRatesOfReturn(attributes: $data){
            ratesOfReturn {
                id
                professionalPrediction
                static
            }
            monteCarloRateOfReturns {
                average
                description
                expectedAverage
                highBand
                howManyYears
                id
                lowBand
                regenerate
                startYear
            }
            userDefinedRateOfReturns {
                howManyYears
                id
                percent
                year
            }
        }
    }
`;

export const QL_RATES_OF_RETURN_UPDATE = gql`
    mutation updateRatesOfReturn($id: String!, $data: RatesOfReturnMutationAttributes){
        updateRatesOfReturn(id: $id, attributes: $data){
            ratesOfReturn {
                id
                professionalPrediction
                static
            }
            monteCarloRateOfReturns {
                average
                description
                expectedAverage
                highBand
                howManyYears
                id
                lowBand
                regenerate
                startYear
            }
            userDefinedRateOfReturns {
                howManyYears
                id
                percent
                year
            }
        }
    }
`;

export const QL_TAX_INFLATION_LIST = gql`
    {
        taxAndInflations {
            amountOfCarryForward
            amountWithdrawnSubjectToCapGains
            capGainsRateFederal
            capGainsRateState
            carryForwardDate
            carryForwardLossNotes
            deductions
            doYouHaveCarryForwardLoss
            educationInflation
            educationInflationRate
            federalCollectibleTaxRate
            federalTaxRate
            generalInflation
            generalInflationRate
            housingInflation
            housingInflationRate
            id
            luxuryInflation
            luxuryInflationRate
            medicalInflation
            medicalInflationRate
            stateTaxEffectiveRate
            stateTaxation
            taxCredits {
                amountOfCredit
                id
                otherTaxCredit
            }
            taxFilingElection
            totalAdjustedGrossIncome
            totalTaxRate
        }
    }
`;


export const QL_TAX_INFLATION_GET = gql`
    query taxAndInflation($id: String!) {
        taxAndInflation(id: $id) {
            amountOfCarryForward
            amountWithdrawnSubjectToCapGains
            capGainsRateFederal
            capGainsRateState
            carryForwardDate
            carryForwardLossNotes
            deductions
            doYouHaveCarryForwardLoss
            educationInflation
            educationInflationRate
            federalCollectibleTaxRate
            federalTaxRate
            generalInflation
            generalInflationRate
            housingInflation
            housingInflationRate
            id
            luxuryInflation
            luxuryInflationRate
            medicalInflation
            medicalInflationRate
            stateTaxEffectiveRate
            stateTaxation
            taxCredits {
                amountOfCredit
                id
                otherTaxCredit
            }
            taxFilingElection
            totalAdjustedGrossIncome
            totalTaxRate
        }
    }
`;

export const QL_TAX_INFLATION_ADD = gql`
    mutation createTaxAndInflation($data: TaxAndInflationMutationAttributes){
        createTaxAndInflation(attributes: $data){
            amountOfCarryForward
            amountWithdrawnSubjectToCapGains
            capGainsRateFederal
            capGainsRateState
            carryForwardDate
            carryForwardLossNotes
            deductions
            doYouHaveCarryForwardLoss
            educationInflation
            educationInflationRate
            federalCollectibleTaxRate
            federalTaxRate
            generalInflation
            generalInflationRate
            housingInflation
            housingInflationRate
            id
            luxuryInflation
            luxuryInflationRate
            medicalInflation
            medicalInflationRate
            stateTaxEffectiveRate
            stateTaxation
            taxCredits {
                amountOfCredit
                id
                otherTaxCredit
            }
            taxFilingElection
            totalAdjustedGrossIncome
            totalTaxRate
        }
    }
`;

export const QL_TAX_INFLATION_UPDATE = gql`
    mutation updateTaxAndInflation($id: String!, $data: TaxAndInflationMutationAttributes){
        updateTaxAndInflation(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_CLIENT_CONTACT_LIST = gql`
    {
        clientContacts {
            address {
                city
                country
                firstLine
                id
                postalCode
                secondLine
                state
            }
            company
            email
            firstName
            id
            lastName
            notes
            partOfMyProfessionalTeam
            primaryContactNumber
            profession
            relationship
            secondaryContactNumber
        }
    }
`;

export const QL_CLIENT_CONTACT_GET = gql`
    query clientContact($id: String!) {
        clientContact(id: $id) {
            address {
                city
                country
                firstLine
                id
                postalCode
                secondLine
                state
            }
            company
            email
            firstName
            id
            lastName
            notes
            partOfMyProfessionalTeam
            primaryContactNumber
            profession
            relationship
            secondaryContactNumber
        }
    }
`;

export const QL_CLIENT_CONTACT_ADD = gql`
    mutation createClientContact($data: ClientContactMutationAttributes){
        createClientContact(attributes: $data){
            address {
                city
                country
                firstLine
                id
                postalCode
                secondLine
                state
            }
            company
            email
            firstName
            id
            lastName
            notes
            partOfMyProfessionalTeam
            primaryContactNumber
            profession
            relationship
            secondaryContactNumber
        }
    }
`;

export const QL_CLIENT_CONTACT_UPDATE = gql`
    mutation updateClientContact($id: String!, $data: ClientContactMutationAttributes){
        updateClientContact(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_CLIENT_CONTACT_DELETE = gql`
    mutation deleteClientContact($id: String!){
        deleteClientContact(id: $id){
            address {
                city
                country
                firstLine
                id
                postalCode
                secondLine
                state
            }
            company
            email
            firstName
            id
            lastName
            notes
            partOfMyProfessionalTeam
            primaryContactNumber
            profession
            relationship
            secondaryContactNumber
        }
    }
`;

export const QL_LIABILITIES_CREDIT_LIST = gql`
    {
        liabilitiesAndCredits{
            addToMonthlyBudget
            additionalCreditCardInformation {
                additionalNotesAboutCreditCard
                annualFee
                creditBalance
                creditLimit
                id
                interestRate
                monthlyPayment
                phoneNumberOfIssuer
                pointBalance
                pointExpiration
            }
            additionalPrincipalPayments
            additionalPrincipals {
                extraPrincipalPaymentDescription
                howMuch
                howOften
                id
                lastAdditionalPayment
                numberOfOccurrences
                whenWillPaymentStart
            }
            adjustableLoanDetails {
                adjustableLoanDetails
                dateOfRateChange
                id
                monthOfRateChange
                newPercentage
            }
            associatedAsset
            generalAssumption {
                currentBalance
                currentMonthlyPayment
                dateOfCurrentBalance
                futurePaymentChanges
                id
                monthNumberOfCurrentBalanceDate
                originalCumulativeInterest
                originalMonthToPayOff
                totalMonthToPayOff
            }
            id
            initialLoanAmount
            interestRate
            isThereAnAssociatedAsset
            last4DigitsOfAccount
            lengthOfLoan
            liabilityPayoffDate
            liabilityType
            loanPaybackType
            maturityDate
            monthlyPayment
            nameOfFinancialInstitution
            nameOfLiability
            owner
            startDate
            statusOfLiability
            typeOfLoan
        }
    }
`;

export const QL_LIABILITIES_CREDIT_GET = gql`
    query liabilitiesAndCredit($id: String!) {
        liabilitiesAndCredit(id: $id) {
            addToMonthlyBudget
            additionalCreditCardInformation {
                additionalNotesAboutCreditCard
                annualFee
                creditBalance
                creditLimit
                id
                interestRate
                monthlyPayment
                phoneNumberOfIssuer
                pointBalance
                pointExpiration
            }
            additionalPrincipalPayments
            additionalPrincipals {
                extraPrincipalPaymentDescription
                howMuch
                howOften
                id
                lastAdditionalPayment
                numberOfOccurrences
                whenWillPaymentStart
            }
            adjustableLoanDetails {
                adjustableLoanDetails
                dateOfRateChange
                id
                monthOfRateChange
                newPercentage
            }
            associatedAsset
            generalAssumption {
                currentBalance
                currentMonthlyPayment
                dateOfCurrentBalance
                futurePaymentChanges
                id
                monthNumberOfCurrentBalanceDate
                originalCumulativeInterest
                originalMonthToPayOff
                totalMonthToPayOff
            }
            id
            initialLoanAmount
            interestRate
            isThereAnAssociatedAsset
            last4DigitsOfAccount
            lengthOfLoan
            liabilityPayoffDate
            liabilityType
            loanPaybackType
            maturityDate
            monthlyPayment
            nameOfFinancialInstitution
            nameOfLiability
            owner
            startDate
            statusOfLiability
            typeOfLoan
        }
    }
`;

export const QL_LIABILITIES_CREDIT_ADD = gql`
    mutation createLiabilitiesAndCredit($data: LiabilitiesAndCreditMutationAttributes){
        createLiabilitiesAndCredit(attributes: $data){
            addToMonthlyBudget
            additionalCreditCardInformation {
                additionalNotesAboutCreditCard
                annualFee
                creditBalance
                creditLimit
                id
                interestRate
                monthlyPayment
                phoneNumberOfIssuer
                pointBalance
                pointExpiration
            }
            additionalPrincipalPayments
            additionalPrincipals {
                extraPrincipalPaymentDescription
                howMuch
                howOften
                id
                lastAdditionalPayment
                numberOfOccurrences
                whenWillPaymentStart
            }
            adjustableLoanDetails {
                adjustableLoanDetails
                dateOfRateChange
                id
                monthOfRateChange
                newPercentage
            }
            associatedAsset
            generalAssumption {
                currentBalance
                currentMonthlyPayment
                dateOfCurrentBalance
                futurePaymentChanges
                id
                monthNumberOfCurrentBalanceDate
                originalCumulativeInterest
                originalMonthToPayOff
                totalMonthToPayOff
            }
            id
            initialLoanAmount
            interestRate
            isThereAnAssociatedAsset
            last4DigitsOfAccount
            lengthOfLoan
            liabilityPayoffDate
            liabilityType
            loanPaybackType
            maturityDate
            monthlyPayment
            nameOfFinancialInstitution
            nameOfLiability
            owner
            startDate
            statusOfLiability
            typeOfLoan
        }
    }
`;

export const QL_LIABILITIES_CREDIT_UPDATE = gql`
    mutation updateLiabilitiesAndCredit($id: String!, $data: LiabilitiesAndCreditMutationAttributes){
        updateLiabilitiesAndCredit(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_LIABILITIES_CREDIT_DELETE = gql`
    mutation deleteLiabilitiesAndCredit($id: String!){
        deleteLiabilitiesAndCredit(id: $id){
            addToMonthlyBudget
            additionalCreditCardInformation {
                additionalNotesAboutCreditCard
                annualFee
                creditBalance
                creditLimit
                id
                interestRate
                monthlyPayment
                phoneNumberOfIssuer
                pointBalance
                pointExpiration
            }
            additionalPrincipalPayments
            additionalPrincipals {
                extraPrincipalPaymentDescription
                howMuch
                howOften
                id
                lastAdditionalPayment
                numberOfOccurrences
                whenWillPaymentStart
            }
            adjustableLoanDetails {
                adjustableLoanDetails
                dateOfRateChange
                id
                monthOfRateChange
                newPercentage
            }
            associatedAsset
            generalAssumption {
                currentBalance
                currentMonthlyPayment
                dateOfCurrentBalance
                futurePaymentChanges
                id
                monthNumberOfCurrentBalanceDate
                originalCumulativeInterest
                originalMonthToPayOff
                totalMonthToPayOff
            }
            id
            initialLoanAmount
            interestRate
            isThereAnAssociatedAsset
            last4DigitsOfAccount
            lengthOfLoan
            liabilityPayoffDate
            liabilityType
            loanPaybackType
            maturityDate
            monthlyPayment
            nameOfFinancialInstitution
            nameOfLiability
            owner
            startDate
            statusOfLiability
            typeOfLoan
        }
    }
`;


export const QL_INSURANCE_PRODUCT_LIST = gql`
    {
        insuranceProducts{
            autoInsuranceInformation {
                bodilyInjuryAggregate
                bodilyInjuryPerIncident
                id
                propertyDamagePerIncident
            }
            financialInformation {
                annualPremium
                cashValue
                cashValueDate
                deductible
                faceValue
                id
                monthlyPremium
            }
            id
            incomeInformation {
                currentAnnualIncome
                currentMonthlyIncome
                dateFutureIncomeEnds
                frequencyOfCurrentIncome
                futureAnnualIncome
                futureIncomeDate
                futureLumpSumPayment
                id
                incomeEndsAtDeath
                incomeStartsAtRetirement
                lumpSumPaymentDate
                taxable
            }
            longTermCare {
                dailyBenefit
                eliminationPeriod
                id
                inflationRider
                lifetimeBenefit
                monthlyBenefit
            }
            productInformation {
                addBeneficiaries
                carrier
                id
                insuranceType
                insured
                lastFourOfPolicyNumber
                nameOfBeneficiary
                nicknameOfInsuranceProduct
                owner
                percent
                policyEndDate
                policyStartDate
            }
        }
    }
`;

export const QL_INSURANCE_PRODUCT_GET = gql`
    query insuranceProduct($id: String!) {
        insuranceProduct(id: $id) {
            autoInsuranceInformation {
                bodilyInjuryAggregate
                bodilyInjuryPerIncident
                id
                propertyDamagePerIncident
            }
            financialInformation {
                annualPremium
                cashValue
                cashValueDate
                deductible
                faceValue
                id
                monthlyPremium
            }
            id
            incomeInformation {
                currentAnnualIncome
                currentMonthlyIncome
                dateFutureIncomeEnds
                frequencyOfCurrentIncome
                futureAnnualIncome
                futureIncomeDate
                futureLumpSumPayment
                id
                incomeEndsAtDeath
                incomeStartsAtRetirement
                lumpSumPaymentDate
                taxable
            }
            longTermCare {
                dailyBenefit
                eliminationPeriod
                id
                inflationRider
                lifetimeBenefit
                monthlyBenefit
            }
            productInformation {
                addBeneficiaries
                carrier
                id
                insuranceType
                insured
                lastFourOfPolicyNumber
                nameOfBeneficiary
                nicknameOfInsuranceProduct
                owner
                percent
                policyEndDate
                policyStartDate
            }
        }
    }
`;

export const QL_INSURANCE_PRODUCT_ADD = gql`
    mutation createInsuranceProduct($data: InsuranceProductMutationAttributes){
        createInsuranceProduct(attributes: $data){
            autoInsuranceInformation {
                bodilyInjuryAggregate
                bodilyInjuryPerIncident
                id
                propertyDamagePerIncident
            }
            financialInformation {
                annualPremium
                cashValue
                cashValueDate
                deductible
                faceValue
                id
                monthlyPremium
            }
            id
            incomeInformation {
                currentAnnualIncome
                currentMonthlyIncome
                dateFutureIncomeEnds
                frequencyOfCurrentIncome
                futureAnnualIncome
                futureIncomeDate
                futureLumpSumPayment
                id
                incomeEndsAtDeath
                incomeStartsAtRetirement
                lumpSumPaymentDate
                taxable
            }
            longTermCare {
                dailyBenefit
                eliminationPeriod
                id
                inflationRider
                lifetimeBenefit
                monthlyBenefit
            }
            productInformation {
                addBeneficiaries
                carrier
                id
                insuranceType
                insured
                lastFourOfPolicyNumber
                nameOfBeneficiary
                nicknameOfInsuranceProduct
                owner
                percent
                policyEndDate
                policyStartDate
            }
        }
    }
`;

export const QL_INSURANCE_PRODUCT_UPDATE = gql`
    mutation updateInsuranceProduct($id: String!, $data: InsuranceProductMutationAttributes){
        updateInsuranceProduct(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_INSURANCE_PRODUCT_DELETE = gql`
    mutation deleteInsuranceProduct($id: String!){
        deleteInsuranceProduct(id: $id){
            autoInsuranceInformation {
                bodilyInjuryAggregate
                bodilyInjuryPerIncident
                id
                propertyDamagePerIncident
            }
            financialInformation {
                annualPremium
                cashValue
                cashValueDate
                deductible
                faceValue
                id
                monthlyPremium
            }
            id
            incomeInformation {
                currentAnnualIncome
                currentMonthlyIncome
                dateFutureIncomeEnds
                frequencyOfCurrentIncome
                futureAnnualIncome
                futureIncomeDate
                futureLumpSumPayment
                id
                incomeEndsAtDeath
                incomeStartsAtRetirement
                lumpSumPaymentDate
                taxable
            }
            longTermCare {
                dailyBenefit
                eliminationPeriod
                id
                inflationRider
                lifetimeBenefit
                monthlyBenefit
            }
            productInformation {
                addBeneficiaries
                carrier
                id
                insuranceType
                insured
                lastFourOfPolicyNumber
                nameOfBeneficiary
                nicknameOfInsuranceProduct
                owner
                percent
                policyEndDate
                policyStartDate
            }
        }
    }
`;

export const QL_INCOME_LIST = gql`
    {
        incomes{
            ageAtDesiredRetirement
            alreadyReceivingIncome
            amountSubjectToTax
            dateIncomeEnds
            dateIncomeStarts
            earnedIncomeInformation {
                id
                typeOfEmploymentIncome
            }
            employee {
                employeeRetirementContributions
                federalTaxes
                id
                stateTaxes
            }
            estimatedAmountRemainingFirstYear
            estimatedMonthlyIncome
            frequencyOfPayPeriods
            grossWages
            id
            incomeEndsAt
            incomeSourceFromAsset
            incomeSourceFromInsurancePolicy
            incomeTaxation {
                adjustedGrossIncome
                amountSubjectToFederalTaxation
                federalTaxationType
                id
                passiveOrEarned
                stateTaxationType
            }
            incomeType
            independentContractor {
                id
                lessSelfEmploymentAdjustment
                taxableSelfEmploymentEarnings
            }
            militaryBenefit {
                amountSubjectToStateTax
                id
                payeeOfSurvivorBenefits
                percentToSurvivor
            }
            nicknameIncome
            notes
            otherIncomeType
            owner
            payeeOfSurvivorBenefits
            percentToSurvivor
            percentageYearlyIncrease
        }
    }
`;

export const QL_INCOME_GET = gql`
    query income($id: String!) {
        income(id: $id) {
            ageAtDesiredRetirement
            alreadyReceivingIncome
            amountSubjectToTax
            dateIncomeEnds
            dateIncomeStarts
            earnedIncomeInformation {
                id
                typeOfEmploymentIncome
            }
            employee {
                employeeRetirementContributions
                federalTaxes
                id
                stateTaxes
            }
            estimatedAmountRemainingFirstYear
            estimatedMonthlyIncome
            frequencyOfPayPeriods
            grossWages
            id
            incomeEndsAt
            incomeSourceFromAsset
            incomeSourceFromInsurancePolicy
            incomeTaxation {
                adjustedGrossIncome
                amountSubjectToFederalTaxation
                federalTaxationType
                id
                passiveOrEarned
                stateTaxationType
            }
            incomeType
            independentContractor {
                id
                lessSelfEmploymentAdjustment
                taxableSelfEmploymentEarnings
            }
            militaryBenefit {
                amountSubjectToStateTax
                id
                payeeOfSurvivorBenefits
                percentToSurvivor
            }
            nicknameIncome
            notes
            otherIncomeType
            owner
            payeeOfSurvivorBenefits
            percentToSurvivor
            percentageYearlyIncrease
        }
    }
`;

export const QL_INCOME_ADD = gql`
    mutation createIncome($data: IncomeMutationAttributes){
        createIncome(attributes: $data){
            ageAtDesiredRetirement
            alreadyReceivingIncome
            amountSubjectToTax
            dateIncomeEnds
            dateIncomeStarts
            earnedIncomeInformation {
                id
                typeOfEmploymentIncome
            }
            employee {
                employeeRetirementContributions
                federalTaxes
                id
                stateTaxes
            }
            estimatedAmountRemainingFirstYear
            estimatedMonthlyIncome
            frequencyOfPayPeriods
            grossWages
            id
            incomeEndsAt
            incomeSourceFromAsset
            incomeSourceFromInsurancePolicy
            incomeTaxation {
                adjustedGrossIncome
                amountSubjectToFederalTaxation
                federalTaxationType
                id
                passiveOrEarned
                stateTaxationType
            }
            incomeType
            independentContractor {
                id
                lessSelfEmploymentAdjustment
                taxableSelfEmploymentEarnings
            }
            militaryBenefit {
                amountSubjectToStateTax
                id
                payeeOfSurvivorBenefits
                percentToSurvivor
            }
            nicknameIncome
            notes
            otherIncomeType
            owner
            payeeOfSurvivorBenefits
            percentToSurvivor
            percentageYearlyIncrease
        }
    }
`;

export const QL_INCOME_UPDATE = gql`
    mutation updateIncome($id: String!, $data: IncomeMutationAttributes){
        updateIncome(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_INCOME_DELETE = gql`
    mutation deleteIncome($id: String!){
        deleteIncome(id: $id){
            ageAtDesiredRetirement
            alreadyReceivingIncome
            amountSubjectToTax
            dateIncomeEnds
            dateIncomeStarts
            earnedIncomeInformation {
                id
                typeOfEmploymentIncome
            }
            employee {
                employeeRetirementContributions
                federalTaxes
                id
                stateTaxes
            }
            estimatedAmountRemainingFirstYear
            estimatedMonthlyIncome
            frequencyOfPayPeriods
            grossWages
            id
            incomeEndsAt
            incomeSourceFromAsset
            incomeSourceFromInsurancePolicy
            incomeTaxation {
                adjustedGrossIncome
                amountSubjectToFederalTaxation
                federalTaxationType
                id
                passiveOrEarned
                stateTaxationType
            }
            incomeType
            independentContractor {
                id
                lessSelfEmploymentAdjustment
                taxableSelfEmploymentEarnings
            }
            militaryBenefit {
                amountSubjectToStateTax
                id
                payeeOfSurvivorBenefits
                percentToSurvivor
            }
            nicknameIncome
            notes
            otherIncomeType
            owner
            payeeOfSurvivorBenefits
            percentToSurvivor
            percentageYearlyIncrease
        }
    }
`;

export const QL_SOCIAL_SECURITY_LIST = gql`
    {
        socialSecurities{
            clientBirthdate
            clientEstimatedYearOfDeath
            clientEstimatedYearOfRetirement
            id
            itemsRelatedToMoney {
                clientMonthlyBenefitAtFullRetirementAge
                costOfLivingAdjustment
                id
                timeValueOfMoneyInterestRate
            }
            retirementEarningsCalculator {
                dateToBeginReceivingBenefits
                id
                yourEstimatedEarnings
            }
            spouseRetirementEarningsCalculator {
                dateToBeginReceivingBenefits
                id
                monthlyDecreaseInBenefit
                yourEstimatedEarnings
            }
            spouseSection {
                id
                spouseCostOfLivingAdjustment
                spouseEstimatedYearOfRetirement
                spouseMonthlyBenefitAtFullRetirementAge
                spouseTimeValueOfMoneyInterestRate
            }
        }
    }
`;

export const QL_SOCIAL_SECURITY_GET = gql`
    query socialSecurity($id: String!) {
        socialSecurity(id: $id) {
            clientBirthdate
            clientEstimatedYearOfDeath
            clientEstimatedYearOfRetirement
            id
            itemsRelatedToMoney {
                clientMonthlyBenefitAtFullRetirementAge
                costOfLivingAdjustment
                id
                timeValueOfMoneyInterestRate
            }
            retirementEarningsCalculator {
                dateToBeginReceivingBenefits
                id
                yourEstimatedEarnings
            }
            spouseRetirementEarningsCalculator {
                dateToBeginReceivingBenefits
                id
                monthlyDecreaseInBenefit
                yourEstimatedEarnings
            }
            spouseSection {
                id
                spouseCostOfLivingAdjustment
                spouseEstimatedYearOfRetirement
                spouseMonthlyBenefitAtFullRetirementAge
                spouseTimeValueOfMoneyInterestRate
            }
        }
    }
`;

export const QL_SOCIAL_SECURITY_ADD = gql`
    mutation createSocialSecurity($data: SocialSecurityMutationAttributes){
        createSocialSecurity(attributes: $data){
            clientBirthdate
            clientEstimatedYearOfDeath
            clientEstimatedYearOfRetirement
            id
            itemsRelatedToMoney {
                clientMonthlyBenefitAtFullRetirementAge
                costOfLivingAdjustment
                id
                timeValueOfMoneyInterestRate
            }
            retirementEarningsCalculator {
                dateToBeginReceivingBenefits
                id
                yourEstimatedEarnings
            }
            spouseRetirementEarningsCalculator {
                dateToBeginReceivingBenefits
                id
                monthlyDecreaseInBenefit
                yourEstimatedEarnings
            }
            spouseSection {
                id
                spouseCostOfLivingAdjustment
                spouseEstimatedYearOfRetirement
                spouseMonthlyBenefitAtFullRetirementAge
                spouseTimeValueOfMoneyInterestRate
            }
        }
    }
`;

export const QL_SOCIAL_SECURITY_UPDATE = gql`
    mutation updateSocialSecurity($id: String!, $data: SocialSecurityMutationAttributes){
        updateSocialSecurity(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_ASSISTANCE_IN_LIST = gql`
    {
        assistanceIns{
            amountReceived
            assistanceEnds
            currentAssistance
            estimatedStartDate
            frequency
            id
            inheritanceAmount
            personInheritingFromFirstName
            personInheritingFromLastName
            personProvidingAssistanceFirstName
            personProvidingAssistanceLastName
            recipientFirstName
            recipientLastName
            relationship
            yearOfExpectedIncome
        }
    }
`;

export const QL_ASSISTANCE_IN_GET = gql`
    query assistanceIn($id: String!) {
        assistanceIn(id: $id) {
            amountReceived
            assistanceEnds
            currentAssistance
            estimatedStartDate
            frequency
            id
            inheritanceAmount
            personInheritingFromFirstName
            personInheritingFromLastName
            personProvidingAssistanceFirstName
            personProvidingAssistanceLastName
            recipientFirstName
            recipientLastName
            relationship
            yearOfExpectedIncome
        }
    }
`;

export const QL_ASSISTANCE_IN_ADD = gql`
    mutation createAssistanceIn($data: AssistanceInMutationAttributes){
        createAssistanceIn(attributes: $data){
            amountReceived
            assistanceEnds
            currentAssistance
            estimatedStartDate
            frequency
            id
            inheritanceAmount
            personInheritingFromFirstName
            personInheritingFromLastName
            personProvidingAssistanceFirstName
            personProvidingAssistanceLastName
            recipientFirstName
            recipientLastName
            relationship
            yearOfExpectedIncome
        }
    }
`;

export const QL_ASSISTANCE_IN_UPDATE = gql`
    mutation updateAssistanceIn($id: String!, $data: AssistanceInMutationAttributes){
        updateAssistanceIn(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_ASSISTANCE_IN_DELETE = gql`
    mutation deleteAssistanceIn($id: String!){
        deleteAssistanceIn(id: $id){
            id
        }
    }
`;

export const QL_ASSISTANCE_OUT_LIST = gql`
    {
        assistanceOuts{
            addToMonthlyBudget
            annualGiftingAmount
            assistanceEnds
            budgetItem
            estimatedEndDate
            estimatedStartDate
            frequency
            id
            notes
            personProvidingAssistance
            recipientFirstName
            recipientLastName
            relationship
        }
    }
`;

export const QL_ASSISTANCE_OUT_GET = gql`
    query assistanceOut($id: String!) {
        assistanceOut(id: $id) {
            addToMonthlyBudget
            annualGiftingAmount
            assistanceEnds
            budgetItem
            estimatedEndDate
            estimatedStartDate
            frequency
            id
            notes
            personProvidingAssistance
            recipientFirstName
            recipientLastName
            relationship
        }
    }
`;

export const QL_ASSISTANCE_OUT_ADD = gql`
    mutation createAssistanceOut($data: AssistanceOutMutationAttributes){
        createAssistanceOut(attributes: $data){
            addToMonthlyBudget
            annualGiftingAmount
            assistanceEnds
            budgetItem
            estimatedEndDate
            estimatedStartDate
            frequency
            id
            notes
            personProvidingAssistance
            recipientFirstName
            recipientLastName
            relationship
        }
    }
`;

export const QL_ASSISTANCE_OUT_UPDATE = gql`
    mutation updateAssistanceOut($id: String!, $data: AssistanceOutMutationAttributes){
        updateAssistanceOut(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_ASSISTANCE_OUT_DELETE = gql`
    mutation deleteAssistanceOut($id: String!){
        deleteAssistanceOut(id: $id){
            id
        }
    }
`;

export const QL_ASSETS_LIST = gql`
    {
        assets {
            accountType
            additionalQuestion {
                id
                isSpouseSoleBeneficiary
                takeEntireBalanceByEndOf5thYear
            }
            assetAllocation {
                assetAllocation
                id
                percentageOfPortfolioInBonds
                percentageOfPortfolioInStocks
                totalPercent
            }
            assetPerformance {
                id
                monetaryValue
                rateOfReturn
                valueAsOfDate
            }
            beneficiaries {
                id
                name
                percent
            }
            collectible{
                additionNotes
                appraised
                condition
                describeCollectible
                dollarAppliedToMonthlyBudget
                id
                insured
                make
                model
                purchasePrice
                typeOfArt
                typeOfClothing
                typeOfCollectible
                typeOfMemorabilia
                typeOfMetalOrJewelry
                whenWasAppraisalDone
                year
            }
            contributionOrDistributions {
                addToMonthlyBudget
                amount
                contributionOrDistribution
                description
                endDate
                frequency
                id
                orderToDistribute
                startDate
            }
            generatesIncome
            hasLoan
            heldWhere
            id
            inheritedInformation {
                deceasedIraOwnersBirthdate
                deceasedIraOwnersDeathDate
                id
                ownersRelationshipToDeceased
                regularContributionsOrDistributions
            }
            investmentPropertyImprovement {
                adjustedCostBasics
                costOfImprovement
                dateFirstInService
                depreciationSystems
                id
                improvementNotes
                salvageValue
            }
            last4DigitsOfAccount
            livestocks {
                animalType
                count
                id
                livestockNotes
            }
            name
            nameOfInsuranceProduct
            owner
            privatePlacementAndVc {
                additionalFutureCommittments
                futureCommittmentDollarAmount
                id
                nickname
                notes
                whenFutureCommittmentDate
            }
            realState {
                briefDescription
                datePropertyFirstInService
                dollarValueOfLand
                dollarValueOfStructure
                downpayment
                gdsOrAdsDepreciation
                id
                improvementsMadeToProperty
                incomePropertyToDepreciate
                investmentPropertyAddress
                monthlyLease
                originalPurchasePrice
                primarayResidence
                purchasePriceOfProperty
                totalMonthlyExpenses
                typeOfProperty
            }
            sellingAssetCost {
                actualValueAtSaleDate
                commisionOnSale
                considerForRetirement
                dateOfSale
                id
                otherTransactionCosts
                taxes
                totalLiabilities
                totalNetSoldValue
                valueBasedOnRateOfReturn
            }
            status
            stockIndividualSubforms {
                enterTodaysValue
                id
                stockSymbol
            }
            taxAndLiquidity {
                abilityForPartialSale
                costBasis
                costBasisDate
                earlyWithdrawlPenalty
                estimatedUnrealizedGains
                id
                penaltyBasedOnAgeInClientsAndPlans
                rmdEligible
                taxabilityOfDistribution
                taxabilityOnDistribution
                taxibility
                thisAssetIsLiquid
            }
            userDefinedPortfolio {
                id
                portfolioPercentageOfBonds
                portfolioPercentageOfCash
                portfolioPercentageOfGold
                portfolioPercentageOfRealEstate
                portfolioPercentageOfSAndP500
                totalPercentage
            }
            userDefinedReturnSubform {
                id
                monetaryValue
                monteCarlo
                percent
                startYear
                staticReturn
                valueAsOfDate
                year
            }
        }
    }
`;

export const QL_ASSETS_GET = gql`
    query asset($id: String!) {
        asset(id: $id) {
            accountType
            additionalQuestion {
                id
                isSpouseSoleBeneficiary
                takeEntireBalanceByEndOf5thYear
            }
            assetAllocation {
                assetAllocation
                id
                percentageOfPortfolioInBonds
                percentageOfPortfolioInStocks
                totalPercent
            }
            assetPerformance {
                id
                monetaryValue
                rateOfReturn
                valueAsOfDate
            }
            beneficiaries {
                id
                name
                percent
            }
            collectible{
                additionNotes
                appraised
                condition
                describeCollectible
                dollarAppliedToMonthlyBudget
                id
                insured
                make
                model
                purchasePrice
                typeOfArt
                typeOfClothing
                typeOfCollectible
                typeOfMemorabilia
                typeOfMetalOrJewelry
                whenWasAppraisalDone
                year
            }
            contributionOrDistributions {
                addToMonthlyBudget
                amount
                contributionOrDistribution
                description
                endDate
                frequency
                id
                orderToDistribute
                startDate
            }
            generatesIncome
            hasLoan
            heldWhere
            id
            inheritedInformation {
                deceasedIraOwnersBirthdate
                deceasedIraOwnersDeathDate
                id
                ownersRelationshipToDeceased
                regularContributionsOrDistributions
            }
            investmentPropertyImprovement {
                adjustedCostBasics
                costOfImprovement
                dateFirstInService
                depreciationSystems
                id
                improvementNotes
                salvageValue
            }
            last4DigitsOfAccount
            livestocks {
                animalType
                count
                id
                livestockNotes
            }
            name
            nameOfInsuranceProduct
            owner
            privatePlacementAndVc {
                additionalFutureCommittments
                futureCommittmentDollarAmount
                id
                nickname
                notes
                whenFutureCommittmentDate
            }
            realState {
                briefDescription
                datePropertyFirstInService
                dollarValueOfLand
                dollarValueOfStructure
                downpayment
                gdsOrAdsDepreciation
                id
                improvementsMadeToProperty
                incomePropertyToDepreciate
                investmentPropertyAddress
                monthlyLease
                originalPurchasePrice
                primarayResidence
                purchasePriceOfProperty
                totalMonthlyExpenses
                typeOfProperty
            }
            sellingAssetCost {
                actualValueAtSaleDate
                commisionOnSale
                considerForRetirement
                dateOfSale
                id
                otherTransactionCosts
                taxes
                totalLiabilities
                totalNetSoldValue
                valueBasedOnRateOfReturn
            }
            status
            stockIndividualSubforms {
                enterTodaysValue
                id
                stockSymbol
            }
            taxAndLiquidity {
                abilityForPartialSale
                costBasis
                costBasisDate
                earlyWithdrawlPenalty
                estimatedUnrealizedGains
                id
                penaltyBasedOnAgeInClientsAndPlans
                rmdEligible
                taxabilityOfDistribution
                taxabilityOnDistribution
                taxibility
                thisAssetIsLiquid
            }
            userDefinedPortfolio {
                id
                portfolioPercentageOfBonds
                portfolioPercentageOfCash
                portfolioPercentageOfGold
                portfolioPercentageOfRealEstate
                portfolioPercentageOfSAndP500
                totalPercentage
            }
            userDefinedReturnSubform {
                id
                monetaryValue
                monteCarlo
                percent
                startYear
                staticReturn
                valueAsOfDate
                year
            }
        }
    }
`;

export const QL_ASSETS_ADD = gql`
    mutation createAsset($data: AssetMutationAttributes){
        createAsset(attributes: $data){
            id
        }
    }
`;

export const QL_ASSETS_UPDATE = gql`
    mutation updateAsset($id: String!, $data: AssetMutationAttributes){
        updateAsset(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_ASSETS_DELETE = gql`
    mutation deleteAsset($id: String!){
        deleteAsset(id: $id){
            id
        }
    }
`;


export const QL_CLIENT_PLAN_LIST = gql`
    query plans($clientId: String!) {
        plans(clientId: $clientId) {
            createdAt
            description
            id
            nickname
            notes
            number
            replicate
        }
    }
`;

export const QL_CLIENT_PLAN_GET = gql`
    query plan($clientId: String = null, $id: String!) {
        plan(clientId: $clientId, id: $id) {
            createdAt
            description
            id
            nickname
            notes
            number
            replicate
        }
    }
`;

export const QL_CLIENT_PLAN_ADD = gql`
    mutation createPlan($data: PlanMutationAttributes){
        createPlan(attributes: $data){
            id
        }
    }
`;

export const QL_CLIENT_PLAN_UPDATE = gql`
    mutation updatePlan($id: String!, $data: PlanMutationAttributes){
        updatePlan(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_CLIENT_PLAN_DELETE = gql`
    mutation deletePlan($id: String!){
        deletePlan(id: $id){
            id
        }
    }
`;

export const QL_GOAL_LIST = gql`
    {
        goals {
            assetsToAssignToGoal {
                addAssetsToGoal
                amountToUseForThisGoal
                amountUsedInOtherGoal
                assetsToAssignToGoal
                id
                loanValueAtGoalDate
                netAfterTaxAppliedToGoal
                showChartOfLiquidAssets
                showChartOfLiquidAssetsToSell
                taxes
                totalShortfallToFund
                valueOfAssetAtGoalDate
            }
            assignSavingsToGoal {
                applySavingsToGoal
                assetsToAssignToGoal
                currentMonthlySavingCapacity
                dateToEndContribution
                dateToStartContribution
                futureValueOfAssetWithSavings
                id
                monthlyNeededToFundGoal
                monthlySavingsToAssign
                totalMonthlySaving
                totalSavingIncludingRateOfReturn
            }
            assignedTo
            assistanceReceivedDetail {
                amountReceived
                estimatedEndDate
                estimatedStartDate
                financialGiftFromOutsideSource
                frequency
                id
                personProvidingAssistanceFirstName
                personProvidingAssistanceLastName
                recipientFirstName
                recipientLastName
                relationship
                totalAmountOfGiftReceived
            }
            clientStartAge
            currentSavedForGoal
            date
            description
            details
            goalFinancingInformation {
                amountNeededInFutureWithInflation
                dollarAmountNeeded
                id
                inflationRateForThisGoal
            }
            goalType
            id
            loan {
                amountNeededInFutureWithInflation
                currentSavedForGoal
                id
                loanNeeded
                percentGoalSuccess
                totalLoanAssignedToGoal
            }
            percentGoalSuccess
        }
    }
`;

export const QL_GOAL_GET = gql`
    query goal($id: String!) {
        goal(id: $id) {
            assetsToAssignToGoal {
                addAssetsToGoal
                amountToUseForThisGoal
                amountUsedInOtherGoal
                assetsToAssignToGoal
                id
                loanValueAtGoalDate
                netAfterTaxAppliedToGoal
                showChartOfLiquidAssets
                showChartOfLiquidAssetsToSell
                taxes
                totalShortfallToFund
                valueOfAssetAtGoalDate
            }
            assignSavingsToGoal {
                applySavingsToGoal
                assetsToAssignToGoal
                currentMonthlySavingCapacity
                dateToEndContribution
                dateToStartContribution
                futureValueOfAssetWithSavings
                id
                monthlyNeededToFundGoal
                monthlySavingsToAssign
                totalMonthlySaving
                totalSavingIncludingRateOfReturn
            }
            assignedTo
            assistanceReceivedDetail {
                amountReceived
                estimatedEndDate
                estimatedStartDate
                financialGiftFromOutsideSource
                frequency
                id
                personProvidingAssistanceFirstName
                personProvidingAssistanceLastName
                recipientFirstName
                recipientLastName
                relationship
                totalAmountOfGiftReceived
            }
            clientStartAge
            currentSavedForGoal
            date
            description
            details
            goalFinancingInformation {
                amountNeededInFutureWithInflation
                dollarAmountNeeded
                id
                inflationRateForThisGoal
            }
            goalType
            id
            loan {
                amountNeededInFutureWithInflation
                currentSavedForGoal
                id
                loanNeeded
                percentGoalSuccess
                totalLoanAssignedToGoal
            }
            percentGoalSuccess
        }
    }
`;

export const QL_GOAL_ADD = gql`
    mutation createGoal($data: GoalMutationAttributes){
        createGoal(attributes: $data){
            id
        }
    }
`;

export const QL_GOAL_UPDATE = gql`
    mutation updateGoal($id: String!, $data: GoalMutationAttributes){
        updateGoal(id: $id, attributes: $data){
            id
        }
    }
`;

export const QL_GOAL_DELETE = gql`
    mutation deleteGoal($id: String!){
        deleteGoal(id: $id){
            id
        }
    }
`;

export const QL_SIGN_IN = gql`
    mutation signin($data: SigninAttributes!){
        signin(attributes: $data){
            account {
                id
                role
                username
            }
            token
        }
    }
`;

export const QL_SIGN_UP = gql`
    mutation signup($data: SignupAttributes!){
        signup(attributes: $data){
            account {
                id
                role
                username
            }
        }
    }
`;

export const QL_ACCOUNT_LIST = gql`
    {
        accounts{
            id
            role
            username
        }
    }
`;

export const QL_ACCOUNT_GET = gql`
    query account($id: String!) {
        account(id: $id) {
            id
            role
            username
        }
    }
`;

export const QL_PLAID_ACCOUNT_LIST = gql`
    query plaidAccounts($accountId: String = null) {
        plaidAccounts(accountId: $accountId) {
            balances
            id
            mask
            name
            officialName
            plaidAccountType
            subtype
            uuid
        }
    }
`;

export const QL_PLAID_ACCOUNT_GET = gql`
    query plaidAccount($accountId: String = null, $id: String) {
        plaidAccount(accountId: $accountId, id: $id) {
            balances
            id
            mask
            name
            officialName
            plaidAccountType
            subtype
            uuid
        }
    }
`;

export const QL_PLAID_ACCOUNT_ADD = gql`
    mutation createPlaidAccount($data: PlaidAccountMutationAttributes){
        createPlaidAccount(attributes: $data){
            balances
            id
            mask
            name
            officialName
            plaidAccountType
            subtype
            uuid
        }
    }
`;

export const QL_PLAID_ACCOUNT_UPDATE = gql`
    mutation updatePlaidAccount($id: String!, $data: PlaidAccountMutationAttributes){
        updatePlaidAccount(id: $id, attributes: $data){
            balances
            id
            mask
            name
            officialName
            plaidAccountType
            subtype
            uuid
        }
    }
`;

export const QL_PLAID_ACCOUNT_DELETE = gql`
    mutation deletePlaidAccount($id: String!){
        deletePlaidAccount(id: $id){
            id
        }
    }
`;

export const QL_PLAID_INCOME_LIST = gql`
    query plaidIncomes($accountId: String = null) {
        plaidIncomes(accountId: $accountId) {
            id
            incomeStreams
            lastYearIncome
            lastYearIncomeBeforeTax
            maxNumberOfOverlappingIncomeStreams
            numberOfIncomeStreams
            projectedYearlyIncome
            projectedYearlyIncomeBeforeTax
        }
    }
`;

export const QL_PLAID_INCOME_GET = gql`
    query plaidIncome($accountId: String = null, $id: String) {
        plaidIncome(accountId: $accountId, id: $id) {
            id
            incomeStreams
            lastYearIncome
            lastYearIncomeBeforeTax
            maxNumberOfOverlappingIncomeStreams
            numberOfIncomeStreams
            projectedYearlyIncome
            projectedYearlyIncomeBeforeTax
        }
    }
`;

export const QL_PLAID_INCOME_ADD = gql`
    mutation createPlaidIncome($data: PlaidIncomeMutationAttributes){
        createPlaidIncome(attributes: $data){
            id
            incomeStreams
            lastYearIncome
            lastYearIncomeBeforeTax
            maxNumberOfOverlappingIncomeStreams
            numberOfIncomeStreams
            projectedYearlyIncome
            projectedYearlyIncomeBeforeTax
        }
    }
`;

export const QL_PLAID_INCOME_UPDATE = gql`
    mutation updatePlaidIncome($id: String!, $data: PlaidIncomeMutationAttributes){
        updatePlaidIncome(id: $id, attributes: $data){
            id
            incomeStreams
            lastYearIncome
            lastYearIncomeBeforeTax
            maxNumberOfOverlappingIncomeStreams
            numberOfIncomeStreams
            projectedYearlyIncome
            projectedYearlyIncomeBeforeTax
        }
    }
`;

export const QL_PLAID_INCOME_DELETE = gql`
    mutation deletePlaidIncome($id: String!){
        deletePlaidIncome(id: $id){
            id
        }
    }
`;

export const QL_PLAID_INVESTMENT_LIST = gql`
    query plaidInvestments($accountId: String = null) {
        plaidInvestments(accountId: $accountId) {
            amount
            cancelTransactionId
            date
            fees
            id
            investmentTransactionId
            investmentType
            isoCurrencyCode
            name
            price
            quantity
            securityId
            unofficialCurrencyCode
            uuid
        }
    }
`;

export const QL_PLAID_INVESTMENT_GET = gql`
    query plaidInvestment($accountId: String = null, $id: String) {
        plaidInvestment(accountId: $accountId, id: $id) {
            amount
            cancelTransactionId
            date
            fees
            id
            investmentTransactionId
            investmentType
            isoCurrencyCode
            name
            price
            quantity
            securityId
            unofficialCurrencyCode
            uuid
        }
    }
`;

export const QL_PLAID_INVESTMENT_ADD = gql`
    mutation createPlaidInvestment($data: PlaidInvestmentMutationAttributes){
        createPlaidInvestment(attributes: $data){
            amount
            cancelTransactionId
            date
            fees
            id
            investmentTransactionId
            investmentType
            isoCurrencyCode
            name
            price
            quantity
            securityId
            unofficialCurrencyCode
            uuid
        }
    }
`;

export const QL_PLAID_INVESTMENT_UPDATE = gql`
    mutation updatePlaidInvestment($id: String!, $data: PlaidInvestmentMutationAttributes){
        updatePlaidInvestment(id: $id, attributes: $data){
            amount
            cancelTransactionId
            date
            fees
            id
            investmentTransactionId
            investmentType
            isoCurrencyCode
            name
            price
            quantity
            securityId
            unofficialCurrencyCode
            uuid
        }
    }
`;

export const QL_PLAID_INVESTMENT_DELETE = gql`
    mutation deletePlaidInvestment($id: String!){
        deletePlaidInvestment(id: $id){
            id
        }
    }
`;

export const QL_PLAID_ITEM_LIST = gql`
    query plaidItems($accountId: String = null) {
        plaidItems(accountId: $accountId) {
            availableProducts
            billedProducts
            consentExpirationTime
            error
            id
            institutionId
            uuid
            webhook
        }
    }
`;

export const QL_PLAID_ITEM_GET = gql`
    query plaidItem($accountId: String = null, $id: String) {
        plaidItem(accountId: $accountId, id: $id) {
            availableProducts
            billedProducts
            consentExpirationTime
            error
            id
            institutionId
            uuid
            webhook
        }
    }
`;

export const QL_PLAID_ITEM_ADD = gql`
    mutation createPlaidItem($data: PlaidItemMutationAttributes){
        createPlaidItem(attributes: $data){
            availableProducts
            billedProducts
            consentExpirationTime
            error
            id
            institutionId
            uuid
            webhook
        }
    }
`;

export const QL_PLAID_ITEM_UPDATE = gql`
    mutation updatePlaidItem($id: String!, $data: PlaidItemMutationAttributes){
        updatePlaidItem(id: $id, attributes: $data){
            availableProducts
            billedProducts
            consentExpirationTime
            error
            id
            institutionId
            uuid
            webhook
        }
    }
`;

export const QL_PLAID_ITEM_DELETE = gql`
    mutation deletePlaidItem($id: String!){
        deletePlaidItem(id: $id){
            id
        }
    }
`;