import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKUsersAppoitments1590348404222
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // clear sqls in memory to avoid removing tables when down queries executed.
    queryRunner.clearSqlMemory();

    const foreignKey = new TableForeignKey({
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('appoitments', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appoitments',
      'FK_d28c31926d27ce11704175b66ef',
    );
  }
}
