const path = require("path");
const { Op  } = require("sequelize");
const  db   = require("../../../sequelize_config/models");

const { Program,ProgramTrip,Trip,ProgramService,Service } = require("../../../sequelize_config/models");
const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { ProgramDTO } = require("../../../compiled/program/serializers/program_serializer");

const get_programs_service = async () => {
  try {
    return await Program.findAll({
      include: [
        {
          model: Trip,
          through: ProgramTrip,
        },{
          model: Service,
          through: ProgramService,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const get_program_service = async (id) => {
  try {
    const program = await Program.findByPk(id, {
      include: [
        {
          model: Trip,
          through: ProgramTrip,
        },{
          model: Service,
          through: ProgramService,
        },
      ],
    });

    return program;
  } catch (error) {
    throw error;
  }
};

const create_program_service = async (data) => {
  let transaction;

  try {
    // Start a transaction to ensure atomicity
    transaction = await db.sequelize.transaction();

    // Deserialize the ProgramDTO
    const program_serializer = plainToInstance(ProgramDTO, data);

    // Validate the deserialized data
    const errors = await validate(program_serializer);

    if (errors.length > 0) {
      throw errors;
    }

    // Create the Program
    const program = await Program.create(program_serializer, { transaction });

    // If tripId is provided, create a ProgramTrip occurrence
    if (data.tripId) {
      await ProgramTrip.create({
        programId: program.programId,
        tripId: data.tripId,
      }, { transaction });
    }

    // Commit the transaction
    await transaction.commit();

    return program;
  } catch (error) {
    // Rollback the transaction if an error occurs
    if (transaction) await transaction.rollback();

    console.error("Error in createProgram:", error);
    throw error;
  }
};


const update_program_service = async (id, updatedData) => {
  const { services,trips, ...programData } = updatedData;

  try {
    const program = await Program.findByPk(id, {
      include: [
        {
          model: Trip,
          through: ProgramTrip,
        },,{
          model: Service,
          through: ProgramService,
        },
      ],
    });
    if (!program) {
      return null;
    }
    await program.update(programData);
    if (trips && Array.isArray(trips)) {
      await program.setTrips(trips);
    }
    if (services && Array.isArray(services)) {
      await program.setServices(services);
    }
    const updatedProgram = await Program.findByPk(id, {
      include: [
        {
          model: Trip,
          through: ProgramTrip,
        },{
          model: Service,
          through: ProgramService,
        },
      ],
    });

    return updatedProgram;
  } catch (error) {
    throw error;
  }
};

const delete_program_service = async (id) => {
  try {
    // Find the program by ID
    const program = await Program.findByPk(id);

    if (!program) {
      throw new Error("Program not found");
    }

    // Delete all occurrences in the ProgramTrip table
    await ProgramTrip.destroy({
      where: { programId: id },
    });

    // Delete the program
    await program.destroy();

    return program;
  } catch (error) {
    throw error;
  }
};

const filter_programs_service = async (filters) => {
  const programs = await Program.findAll({
      include: [
        {
          model: Trip,
          through: ProgramTrip,
        },
      ],
    where: {
      [Op.or]: [
        { label: { [Op.iLike]: `%${filters}%` } },
        { description: { [Op.iLike]: `%${filters}%` } },
      ],
    },
  });
  return programs;
};


const get_programs_by_trip_towns_service = async (departTownId, destTownId) => {
  try {
    const programs = await Program.findAll({
      include: [
        {
          model: Trip,
          through: ProgramTrip,
          where: {
            [Op.and]: [
              { destTownId: destTownId },
              { departTownId: departTownId },
            ],
          },
        },
      ],
    });

    return programs;
  } catch (error) {
    throw error;
  }
};

const assign_trip_to_program = async (data) => {
  try {
    const programId = data.program_id;
    const tripId = data.trip_id; 
    const programTrip = await ProgramTrip.create({
      programId: programId,
      tripId: tripId,
    });
    return programTrip;
  } catch (error) {
    throw error;
  }
};

const assign_service_to_program = async (data) => {

  try {
    const programId = data.program_id;
    const serviceId = data.service_id; 
    const programService = await ProgramService.create({
      programId: programId,
      serviceId: serviceId,
    });
    return programService;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get_programs_service,
  get_program_service,
  create_program_service,
  update_program_service,
  delete_program_service,
  filter_programs_service,
  get_programs_by_trip_towns_service,
  assign_trip_to_program,
  assign_service_to_program
};
