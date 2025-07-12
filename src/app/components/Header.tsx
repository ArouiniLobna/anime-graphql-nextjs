/**
 * Header component with user information display and navigation
 * Provides access to user profile editing and application navigation
 */

"use client";

import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { useUser } from "@/contexts/UserContext";
import { UserInfoModal } from "./UserInfoModel";

export function Header() {
  const { user, clearUser } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleLogout = () => {
    clearUser();
  };

  return (
    <>
      <Box
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        px={4}
        py={3}
        position="sticky"
        top={0}
        zIndex={100}
      >
        <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
          <Heading size="lg" color="blue.600">
            Leonardo.Ai Challenge
          </Heading>

          {user && (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                size="sm"
              >
                <Flex align="center" gap={2}>
                  <Avatar size="sm" name={user.username} />
                  <Box textAlign="left" display={{ base: "none", md: "block" }}>
                    <Text fontSize="sm" fontWeight="medium">
                      {user.username}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {user.jobTitle}
                    </Text>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem icon={<InfoIcon />} onClick={onOpen}>
                  View Profile
                </MenuItem>
                <MenuItem icon={<EditIcon />} onClick={onOpen}>
                  Edit Information
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout} color="red.500">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Box>
      {isOpen && <UserInfoModal isOpen onClose={onClose} isEditing />}
    </>
  );
}
