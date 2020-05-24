import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAppoitments1589326717523
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appoitments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: ' now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: ' now()',
          },
        ],
      }),
    );
    /*
    // clear sqls in memory to avoid removing tables when down queries executed.
    queryRunner.clearSqlMemory();

    const foreignKey = new TableForeignKey({
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('appoitments', foreignKey);
    */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appoitments');
  }
}
