# 治理合同阅读顺序

这个目录提供模板仓库的正式治理合同基线。

定位：
- `project/governance/contracts/` 负责冻结正式合同
- `project/governance/` 负责给当前仓库落地执行约束
- 若两者冲突，应先更新正式合同，再同步执行层文档

建议阅读顺序：
1. `01_governance_contract_overview_v0_1.md`
2. `02_task_kind_contract_v0_1.md`
3. `03_roles_contract_v0_1.md`
4. `04_task_lifecycle_contract_v0_1.md`
5. `05_review_contract_v0_1.md`
6. `06_artifact_contract_v0_1.md`
7. `07_lock_contract_v0_1.md`
8. `08_task_lineage_and_workspace_contract_v0_1.md`
9. `09_task_record_contract_v0_1.md`
10. `10_bug_lifecycle_contract_v0_1.md`
11. `11_project_and_milestone_contract_v0_1.md`
12. `12_run_contract_v0_1.md`
13. `13_dispatch_contract_v0_1.md`
14. `14_main_control_plane_contract_v0_1.md`
15. `15_skills_execution_contract_v0_1.md`

使用方式：
- 新仓库初始化时，先保留这套合同为默认基线
- 再根据目标仓库语言、目录结构、运行环境，在 `project/governance/` 与 `project/planning/project.md` 中写覆盖项
- 若覆盖项改变了正式口径，应先回写到本目录中的正式合同
