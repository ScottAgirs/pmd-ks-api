/* eslint-disable no-await-in-loop */
import { PHARMACY_LOCATIONS } from './pharmacy-locations';

export async function populatePharmacies(keystone: any) {
  const pharmaDB = keystone.db.Pharmacy;
  const pharmaLocDB = keystone.db.PharmacyLocation;
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${PHARMACY_LOCATIONS.length}] Pharmacy Locations 🏥`);
    console.log(`----------------------------------------`);

    // eslint-disable-next-line no-restricted-syntax
    for (const pharmacyLocation of PHARMACY_LOCATIONS) {
      console.log(
        ` 👨🏼‍⚕️ Adding [${pharmacyLocation.companyName}] pharmacyLocation`
      );
      const existing = await pharmaLocDB.findOne({
        where: { accreditationNumber: pharmacyLocation.accreditationNumber },
      });
      console.log(' :: existing', existing?.accreditationNumber);

      if (existing) {
        console.log(
          ` 🌍 PharmacyLocation [${pharmacyLocation.accreditationNumber}] already exists - skipping.`
        );
      } else {
        console.log('Will create new PharmacyLocation');
        // TODO: Remove eslint-disable and resolve Promise.all
        let pharmaBrandName;
        const existingPharmaBrand = await pharmaDB.findOne({
          where: { companyName: pharmacyLocation.companyName },
        });

        console.log(':: existingPharmaBrand', existingPharmaBrand?.companyName);
        // Create new Pharmacy Brand
        if (existingPharmaBrand) {
          pharmaBrandName = existingPharmaBrand.companyName;
        } else {
          const newPharmaBrand = await pharmaDB.createOne({
            data: {
              companyName: pharmacyLocation.companyName,
            },
          });

          pharmaBrandName = newPharmaBrand.companyName;
        }

        // Create new Pharmacy Location
        try {
          await pharmaLocDB.createOne({
            data: {
              accreditationNumber: pharmacyLocation.accreditationNumber,
              address: {
                create: {
                  addressLine1: pharmacyLocation.addressLine1,
                  addressLine2: pharmacyLocation.addressLine2,
                  administrativeArea: 'UNKNOWN',
                  country: 'CA',
                  locality: pharmacyLocation.City,
                  postalCode: pharmacyLocation.Zip,
                },
              },
              faxString: pharmacyLocation.Fax,
              pharmacy: {
                connect: { companyName: pharmaBrandName },
              },
              phoneString: pharmacyLocation.Phone,
              status: pharmacyLocation.Status,
            },
          });
        } catch (error: any) {
          console.log('errr -msg', error.message);
          throw new Error(
            `Error creating pharmacyLocation [${pharmacyLocation.accreditationNumber}]`
          );
        }
      }
    }

    console.log(`✅ Seeded [${PHARMACY_LOCATIONS.length}] Pharmas 🏥`);
  } catch (error) {
    console.error('populatepharmacyLocations :: error', error);
  }
}
