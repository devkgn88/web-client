> [!CAUTION]
> 현재 이 브랜치는 **React 18 및 MUI v5 기반 마이그레이션 작업 중**입니다.  
> 안정적인 기존 버전은 `main` 브랜치를 확인해주세요.

# 🚧 web-client (migrate 브랜치)

이 브랜치는 기존 React 16 기반 프로젝트를 React 18 및 최신 라이브러리 스택으로 마이그레이션하는 작업을 진행 중입니다.

## ⛓ 브랜치 안내
- `main`: 안정적인 기존 버전 (React 16 + Material-UI v4)
- `migrate`: React 18 및 MUI v5 대응 중인 개발 브랜치

## 🔄 주요 변경 사항 (업그레이드 내역)

| 항목 | 이전 버전 | 변경 후 |
|------|-----------|---------|
| React | 16.8.6 | 18.x |
| React DOM | 16.8.6 | 18.x |
| React Scripts | 3.0.1 | 5.x |
| Material-UI | `@material-ui/core` v4.3.0 | `@mui/material` v5.x |
| Icons | `@material-ui/icons` | `@mui/icons-material` |
| ThemeProvider 등 스타일 관련 | `@material-ui/styles` | `@mui/material/styles` |
| mui-datatables | 사용 중단 예정 | material-react-table로 교체 |

## 🛠 현재 진행 중인 작업

- [x] React 및 ReactDOM 버전 업
- [x] MUI 패키지 교체 (`@material-ui/* → @mui/*`)
- [ ] mui-datatables를 material-react-table로 변경
- [ ] 스타일 및 레이아웃 이슈 점검 및 수정

## 📦 설치 및 실행 (React 18 기준)
```bash
git clone https://github.com/devkgn88/web-client.git
cd web-client
git checkout migrate
npm install
npm start
